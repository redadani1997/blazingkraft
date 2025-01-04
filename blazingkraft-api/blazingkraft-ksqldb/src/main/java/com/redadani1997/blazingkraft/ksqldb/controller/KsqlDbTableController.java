package com.redadani1997.blazingkraft.ksqldb.controller;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient;
import com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode;
import com.redadani1997.blazingkraft.common.actions.ksqldb.KsqlDbTableActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.api.KsqlDbTableApi;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.model.KsqlDbTableApiResponse;
import com.redadani1997.blazingkraft.ksqldb.service.KsqlDbTableService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KsqlDbTableController implements KsqlDbTableApi {

    private final KsqlDbTableService ksqlDbTableService;

    @WithCleanUp
    @WithKsqlDbCode
    @WithKsqlDbClient
    @WithAuthorization(
            permission = KsqlDbTableActions.DESCRIBE_KSQLDB_TABLES,
            type = EntityType.KSQLDB)
    @Override
    public ResponseEntity<List<KsqlDbTableApiResponse>> getAllKsqlDbTables() {
        List<KsqlDbTableApiResponse> responses = this.ksqlDbTableService.getAllKsqlDbTables();

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }
}
