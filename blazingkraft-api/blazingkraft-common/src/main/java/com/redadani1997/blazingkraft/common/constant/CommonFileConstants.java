package com.redadani1997.blazingkraft.common.constant;

import com.redadani1997.blazingkraft.common.util.CommonFileUtils;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonFileConstants {
    private static final String BLAZINGKRAFT_BASE_FOLDER_PROPERTY = "BLAZINGKRAFT_BASE_FOLDER";
    private static final String BLAZINGKRAFT_BASE_FOLDER = determineBlazingKRaftBaseFolder();

    private static String determineBlazingKRaftBaseFolder() {
        String basePath = System.getProperty(BLAZINGKRAFT_BASE_FOLDER_PROPERTY);

        if (basePath == null || basePath.isBlank()) {
            return "/var/blazingkraft";
        } else {
            log.info(
                    CommonLogUtils.getInfo(
                            String.format("Blazing KRaft Base Folder set to: '%s'", basePath)));
            return basePath;
        }
    }

    // RSA
    public static final String BLAZINGKRAFT_RSA_KEY_FOLDER_PATH =
            CommonFileUtils.joinPaths(BLAZINGKRAFT_BASE_FOLDER, "/rsa-keys");
    public static final String BLAZINGKRAFT_RSA_KEY_FILE_NAME = "blazingkraft-rsa-keys.json";

    // FILES
    public static final String BLAZINGKRAFT_FILES_FOLDER_PATH =
            CommonFileUtils.joinPaths(BLAZINGKRAFT_BASE_FOLDER, "/files");

    // H2
    public static final String BLAZINGKRAFT_H2_DATABASE_FOLDER_PATH =
            CommonFileUtils.joinPaths(BLAZINGKRAFT_BASE_FOLDER, "/database/database");

    // TMP
    public static final String BLAZINGKRAFT_TMP_EXPORT_FOLDER_PATH =
            CommonFileUtils.joinPaths(BLAZINGKRAFT_BASE_FOLDER, "/tmp/export");
    public static final String BLAZINGKRAFT_TMP_IMPORT_FOLDER_PATH =
            CommonFileUtils.joinPaths(BLAZINGKRAFT_BASE_FOLDER, "/tmp/import");

    // CLUSTER EXPORT IMPORT
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FOLDER_PATH = "cluster";
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FILE_NAME = "cluster.json";
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_PRODUCER_FOLDER_PATH = "producer";
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_PRODUCER_FILE_NAME = "producer.json";
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_CONSUMER_FOLDER_PATH = "consumer";
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_CONSUMER_FILE_NAME = "consumer.json";
    public static final String BLAZINGKRAFT_EXPORT_IMPORT_CLUSTER_FILES_FOLDER_PATH = "files";
}
