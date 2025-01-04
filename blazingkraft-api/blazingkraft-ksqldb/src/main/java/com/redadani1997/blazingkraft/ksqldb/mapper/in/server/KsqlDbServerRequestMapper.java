package com.redadani1997.blazingkraft.ksqldb.mapper.in.server;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.ksqldb.dto.in.server.*;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerClientConnectivityApiRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerCreateApiRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerEditApiRequest;
import com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model.KsqlDbServerJmxConnectivityApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KsqlDbServerRequestMapper {
    private final AuditLogService auditLogService;

    public KsqlDbServerCreateRequest ksqlDbServerCreateRequest(
            KsqlDbServerCreateApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);

        this.auditLogService.setSubject(apiRequest.getCode());

        CommonValidator.assertNotBlank("Name", apiRequest.getName());
        CommonValidator.assertNotBlank("Code", apiRequest.getCode());
        CommonValidator.assertExpression("Code", apiRequest.getCode(), "^[a-zA-Z0-9]+$");
        CommonValidator.assertNotBlank("Host", apiRequest.getHost());
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        return KsqlDbServerCreateRequest.builder()
                .name(apiRequest.getName())
                .code(apiRequest.getCode())
                .color(apiRequest.getColor())
                .host(apiRequest.getHost())
                .port(apiRequest.getPort())
                .basicAuthEnabled(apiRequest.getBasicAuthEnabled())
                .basicAuthUsername(apiRequest.getBasicAuthUsername())
                .basicAuthPassword(apiRequest.getBasicAuthPassword())
                .keyStoreEnabled(apiRequest.getKeyStoreEnabled())
                .keyStore(apiRequest.getKeyStore())
                .keyStorePassword(apiRequest.getKeyStorePassword())
                .trustStoreEnabled(apiRequest.getTrustStoreEnabled())
                .trustStore(apiRequest.getTrustStore())
                .trustStorePassword(apiRequest.getTrustStorePassword())
                .useTls(apiRequest.getUseTls())
                .verifyHost(apiRequest.getVerifyHost())
                .useAlpn(apiRequest.getUseAlpn())
                .executeQueryMaxResultRows(apiRequest.getExecuteQueryMaxResultRows())
                .jmxEnabled(apiRequest.getJmxEnabled())
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public KsqlDbServerEditRequest ksqlDbServerEditRequest(
            String ksqlDbCode, KsqlDbServerEditApiRequest apiRequest) {
        this.auditLogService.setSubject(ksqlDbCode);

        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Code", ksqlDbCode);
        CommonValidator.assertNotBlank("Host", apiRequest.getHost());
        CommonValidator.assertNotBlank("Color", apiRequest.getColor());

        if (apiRequest.getJmxEnabled()) {
            CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());
        }

        return KsqlDbServerEditRequest.builder()
                .code(ksqlDbCode)
                .color(apiRequest.getColor())
                .host(apiRequest.getHost())
                .port(apiRequest.getPort())
                .basicAuthEnabled(apiRequest.getBasicAuthEnabled())
                .basicAuthUsername(apiRequest.getBasicAuthUsername())
                .basicAuthPassword(apiRequest.getBasicAuthPassword())
                .keyStoreEnabled(apiRequest.getKeyStoreEnabled())
                .keyStore(apiRequest.getKeyStore())
                .keyStorePassword(apiRequest.getKeyStorePassword())
                .trustStoreEnabled(apiRequest.getTrustStoreEnabled())
                .trustStore(apiRequest.getTrustStore())
                .trustStorePassword(apiRequest.getTrustStorePassword())
                .useTls(apiRequest.getUseTls())
                .verifyHost(apiRequest.getVerifyHost())
                .useAlpn(apiRequest.getUseAlpn())
                .executeQueryMaxResultRows(apiRequest.getExecuteQueryMaxResultRows())
                .jmxEnabled(apiRequest.getJmxEnabled())
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public KsqlDbServerClientConnectivityRequest ksqlDbServerClientConnectivityRequest(
            KsqlDbServerClientConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotNull("Request", apiRequest);
        CommonValidator.assertNotBlank("Host", apiRequest.getHost());

        return KsqlDbServerClientConnectivityRequest.builder()
                .host(apiRequest.getHost())
                .port(apiRequest.getPort())
                .basicAuthEnabled(apiRequest.getBasicAuthEnabled())
                .basicAuthUsername(apiRequest.getBasicAuthUsername())
                .basicAuthPassword(apiRequest.getBasicAuthPassword())
                .keyStoreEnabled(apiRequest.getKeyStoreEnabled())
                .keyStore(apiRequest.getKeyStore())
                .keyStorePassword(apiRequest.getKeyStorePassword())
                .trustStoreEnabled(apiRequest.getTrustStoreEnabled())
                .trustStore(apiRequest.getTrustStore())
                .trustStorePassword(apiRequest.getTrustStorePassword())
                .useTls(apiRequest.getUseTls())
                .verifyHost(apiRequest.getVerifyHost())
                .useAlpn(apiRequest.getUseAlpn())
                .executeQueryMaxResultRows(apiRequest.getExecuteQueryMaxResultRows())
                .build();
    }

    public KsqlDbServerJmxConnectivityRequest ksqlDbServerJmxConnectivityRequest(
            KsqlDbServerJmxConnectivityApiRequest apiRequest) {
        CommonValidator.assertNotBlank("Jmx Url", apiRequest.getJmxUrl());

        return KsqlDbServerJmxConnectivityRequest.builder()
                .jmxUrl(apiRequest.getJmxUrl())
                .jmxEnvironment(apiRequest.getJmxEnvironment())
                .build();
    }

    public KsqlDbServerDeleteRequest ksqlDbServerDeleteRequest(String ksqlDbCode) {
        this.auditLogService.setSubject(ksqlDbCode);

        CommonValidator.assertNotBlank("Code", ksqlDbCode);

        return KsqlDbServerDeleteRequest.builder().code(ksqlDbCode).build();
    }

    public KsqlDbServerDetailsRequest ksqlDbServerDetailsRequest(String ksqlDbCode) {
        CommonValidator.assertNotBlank("Code", ksqlDbCode);

        return KsqlDbServerDetailsRequest.builder().code(ksqlDbCode).build();
    }
}
