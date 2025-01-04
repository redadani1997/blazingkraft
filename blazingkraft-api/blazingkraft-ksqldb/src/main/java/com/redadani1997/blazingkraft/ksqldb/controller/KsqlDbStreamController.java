package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbStreamActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.api.KsqlDbStreamApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.model.KsqlDbStreamApiResponse;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbStreamService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KsqlDbStreamController implements KsqlDbStreamApi {

    private final KsqlDbStreamService ksqlDbStreamService;

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbStreamActions.DESCRIBE_KSQLDB_STREAMS,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<List<KsqlDbStreamApiResponse>> getAllKsqlDbStreams() {
        List<KsqlDbStreamApiResponse> responses = this.ksqlDbStreamService.getAllKsqlDbStreams();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }
}
