package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbTopicActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.api.KsqlDbTopicApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.model.KsqlDbTopicApiResponse;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbTopicService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KsqlDbTopicController implements KsqlDbTopicApi {

    private final KsqlDbTopicService ksqlDbTopicService;

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbTopicActions.DESCRIBE_KSQLDB_TOPICS,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<List<KsqlDbTopicApiResponse>> getAllKsqlDbTopics() {
        List<KsqlDbTopicApiResponse> responses = this.ksqlDbTopicService.getAllKsqlDbTopics();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }
}
