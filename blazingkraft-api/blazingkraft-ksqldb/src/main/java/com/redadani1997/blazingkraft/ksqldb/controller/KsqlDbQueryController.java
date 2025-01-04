package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbQueryActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.api.KsqlDbQueryApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.model.KsqlDbQueryApiResponse;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbQueryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KsqlDbQueryController implements KsqlDbQueryApi {

    private final KsqlDbQueryService ksqlDbQueryService;

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbQueryActions.DESCRIBE_KSQLDB_QUERIES,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<List<KsqlDbQueryApiResponse>> getAllKsqlDbQueries() {
        List<KsqlDbQueryApiResponse> responses = this.ksqlDbQueryService.getAllKsqlDbQueries();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }
}
