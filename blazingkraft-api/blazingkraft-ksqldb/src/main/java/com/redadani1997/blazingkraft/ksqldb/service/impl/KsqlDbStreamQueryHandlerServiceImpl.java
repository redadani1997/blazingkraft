package com.redadani1997.blazingkraft.ksqldb.service.impl;

import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.ksqldb.CommonKsqlDbClient;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbEditorActions;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.util.CommonBeanUtils;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbEditorException;
import com.redadani1997.blazingkraft.ksqldb.dto.in.editor.KsqlDbStreamQueryRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model.KsqlDbEditorQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.KsqlDbRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.in.editor.KsqlDbEditorRequestMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.KsqlDbResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.mapper.out.editor.KsqlDbEditorResponseMapper;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbStreamQueryService;
import com.redadani1997.blazingkraft.ws.frame.CommonFrameType;
import com.redadani1997.blazingkraft.ws.handler.CommonWebSocketHandler;
import io.confluent.ksql.api.client.Row;
import io.confluent.ksql.api.client.StreamedQueryResult;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.BiConsumer;
import org.springframework.context.ApplicationContext;

public class KsqlDbStreamQueryHandlerServiceImpl extends CommonWebSocketHandler
        implements KsqlDbStreamQueryService {

    private final ClientsFactory clientsFactory;
    private final KsqlDbResponseMapper ksqlDbResponseMapper;
    private final KsqlDbRequestMapper ksqlDbRequestMapper;
    private final AuditLogService auditLogService;
    private Boolean completed = false;
    private Integer size = 1;
    private final List<KsqlDbEditorQueryApiResponse> responses = new ArrayList<>();
    private KsqlDbStreamQueryRequest request;
    private String queryId;

    public KsqlDbStreamQueryHandlerServiceImpl(
            ApplicationContext applicationContext,
            Runnable sessionCloser,
            BiConsumer<CommonFrameType, Object> messageSender,
            CurrentUser currentUser,
            String destination) {
        super(applicationContext, sessionCloser, messageSender, currentUser, destination);
        this.clientsFactory = CommonBeanUtils.getBean(applicationContext, ClientsFactory.class);
        this.ksqlDbRequestMapper =
                CommonBeanUtils.getBean(applicationContext, KsqlDbRequestMapper.class);
        this.ksqlDbResponseMapper =
                CommonBeanUtils.getBean(applicationContext, KsqlDbResponseMapper.class);
        this.auditLogService = CommonBeanUtils.getBean(applicationContext, AuditLogService.class);
    }

    @Override
    public void onSubscribe(String requestBody) {
        CompletableFuture.runAsync(
                        () -> {
                            this.request =
                                    this.ksqlDbEditorRequestMapper()
                                            .ksqlDbStreamQueryRequest(requestBody, this.currentUser());
                            this.streamQuery();
                            this.auditLogService.logSuccess(
                                    KsqlDbEditorActions.KSQLDB_EDITOR_STREAM_QUERY, AuditSeverity.LOW);
                            this.closeSession();
                        })
                .exceptionally(
                        throwable -> {
                            Throwable cause = throwable.getCause() == null ? throwable : throwable.getCause();
                            this.auditLogService.logFailure(
                                    KsqlDbEditorActions.KSQLDB_EDITOR_STREAM_QUERY, AuditSeverity.LOW, cause);
                            this.sendMessage(CommonFrameType.FAILED, cause.getMessage());
                            this.closeSession();
                            return null;
                        });
    }

    @Override
    public void onDisconnect() {
        this.completed = true;
    }

    @Override
    public void streamQuery() {
        StreamedQueryResult streamedQueryResult = null;
        try {
            streamedQueryResult =
                    this.currentKsqlDbClient()
                            .client()
                            .streamQuery(this.request.getSql(), this.request.getProperties())
                            .get(5, TimeUnit.SECONDS);

            this.queryId = streamedQueryResult.queryID();

            while (!this.completed
                    && !streamedQueryResult.isComplete()
                    && !streamedQueryResult.isFailed()) {
                if (this.completed) {
                    return;
                }

                Row row = streamedQueryResult.poll(Duration.of(4, ChronoUnit.SECONDS));
                if (row != null) {
                    this.size++;
                    KsqlDbEditorQueryApiResponse response =
                            this.ksqlDbEditorResponseMapper().ksqlDbEditorQueryApiResponse(row, this.size);
                    this.responses.add(response);
                    this.sendMessage(CommonFrameType.CONTENT, this.responses);
                    this.responses.clear();
                }

                if (this.completed) {
                    return;
                }
            }
        } catch (ExecutionException ex) {
            throw new KsqlDbEditorException(ex.getCause());
        } catch (TimeoutException ex) {
            throw new KsqlDbEditorException("Query timed out (Exceeded 5 seconds)");
        } catch (Exception ex) {
            throw new KsqlDbEditorException(ex);
        } finally {
            if (streamedQueryResult != null && streamedQueryResult.isComplete()) {
                this.sendMessage(CommonFrameType.SUCCEEDED, "No more rows to stream");
            }
            if (queryId != null) {
                this.currentKsqlDbClient().client().terminatePushQuery(queryId);
            }
        }
    }

    private CommonKsqlDbClient currentKsqlDbClient() {
        return this.clientsFactory.currentKsqlDbClient();
    }

    private KsqlDbEditorResponseMapper ksqlDbEditorResponseMapper() {
        return this.ksqlDbResponseMapper.ksqlDbEditorResponseMapper();
    }

    private KsqlDbEditorRequestMapper ksqlDbEditorRequestMapper() {
        return this.ksqlDbRequestMapper.ksqlDbEditorRequestMapper();
    }
}
