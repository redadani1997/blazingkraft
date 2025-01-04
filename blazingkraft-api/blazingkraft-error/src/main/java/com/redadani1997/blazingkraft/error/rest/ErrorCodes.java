package com.redadani1997.blazingkraft.error.rest;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ErrorCodes {
    public static final String ERROR_CODE_PREFIX = "BLAZINGKRAFT-";

    public static final String SERVER_ERROR_CODE = "0000";

    public static final String NO_TOKEN_PROVIDED_ERROR_CODE = "0001";

    public static final String INVALID_TOKEN_ERROR_CODE = "0002";

    public static final String MISSING_REQUEST_PARAMETER_ERROR_CODE = "0003";

    public static final String CONSTRAINT_VIOLATION_ERROR_CODE = "0004";

    public static final String METHOD_ARGUMENT_TYPE_MISMATCH_ERROR_CODE = "0005";

    public static final String METHOD_NOT_SUPPORTED_ERROR_CODE = "0006";

    public static final String MEDIA_TYPE_NOT_SUPPORTED_ERROR_CODE = "0007";

    public static final String BAD_ARGUMENTS_ERROR_CODE = "0008";

    public static final String MISSING_REQUEST_PART_ERROR_CODE = "0009";

    public static final String ADMIN_ERROR_CODE = "0100";

    public static final String KAFKA_CONNECT_ERROR_CODE = "0200";
    public static final String SCHEMA_REGISTRY_ERROR_CODE = "0300";
    public static final String KSQLDB_ERROR_CODE = "0400";
    public static final String MANAGEMENT_ERROR_CODE = "0500";
    public static final String PLAYGROUND_ERROR_CODE = "0600";
    public static final String AUDIT_ERROR_CODE = "0700";
    public static final String CLIENTS_ERROR_CODE = "0800";
    public static final String FILES_ERROR_CODE = "0900";
    public static final String JMX_ERROR_CODE = "1000";
    public static final String COMMON_CLIENT_ERROR_CODE = "1100";
    public static final String KAFKA_ERROR_CODE = "1200";
    public static final String AUTH_SERVER_ERROR_CODE = "1300";
    public static final String AUTHORIZATION_ERROR_CODE = "1400";
    public static final String COMMON_IO_ERROR_CODE = "1500";
}
