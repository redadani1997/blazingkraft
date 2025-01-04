package com.redadani1997.blazingkraft.dao.configuration;

import com.redadani1997.blazingkraft.common.constant.CommonEnvConstants;
import com.redadani1997.blazingkraft.common.constant.CommonFileConstants;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.enums.DataSourceType;
import com.redadani1997.blazingkraft.error.dao.DataSourceException;
import javax.sql.DataSource;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class JdbcDatasourceConfiguration {
    private final Environment environment;

    @Getter private DataSourceType dataSourceType;

    @Bean
    public DataSource dataSource() {
        String dataSourceTypeString =
                this.environment.getProperty(CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_TYPE, "H2");

        DataSourceType dataSourceType;

        try {
            dataSourceType =
                    EnumUtils.fromName(DataSourceType.class, dataSourceTypeString, DataSourceType.H2);
        } catch (Exception ex) {
            throw new DataSourceException(
                    ex,
                    String.format(
                            "Error while evaluating datasource type: '%s' for environment variable '%s'."
                                    + " Valid values are H2, MYSQL, POSTGRESQL, SQLSERVER, MARIADB or by default H2.",
                            dataSourceTypeString, CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_TYPE));
        }
        log.info(
                CommonLogUtils.getInfo(
                        String.format("Blazing KRaft Datasource Type set to: '%s'", dataSourceType)));

        this.dataSourceType = dataSourceType;

        return switch (dataSourceType) {
            case H2 -> this.h2DataSource();
            case MYSQL -> this.mysqlDataSource();
            case POSTGRESQL -> this.postgresqlDataSource();
            case SQLSERVER -> this.sqlserverDataSource();
            case MARIADB -> this.mariadbDataSource();
        };
    }

    private DataSource h2DataSource() {
        String url =
                String.format(
                        "jdbc:h2:file:%s;AUTO_SERVER=TRUE",
                        CommonFileConstants.BLAZINGKRAFT_H2_DATABASE_FOLDER_PATH);
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.h2.Driver");
        dataSourceBuilder.url(url);
        dataSourceBuilder.username("name");
        dataSourceBuilder.password("pass");
        return dataSourceBuilder.build();
    }

    private DataSource mysqlDataSource() {
        String url =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_MYSQL_URL, DataSourceType.MYSQL);
        String username =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_MYSQL_USERNAME, DataSourceType.MYSQL);
        String password =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_MYSQL_PASSWORD, DataSourceType.MYSQL);

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        dataSourceBuilder.url(url);
        dataSourceBuilder.username(username);
        dataSourceBuilder.password(password);
        return dataSourceBuilder.build();
    }

    private DataSource postgresqlDataSource() {
        String url =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_POSTGRESQL_URL, DataSourceType.POSTGRESQL);
        String username =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_POSTGRESQL_USERNAME,
                        DataSourceType.POSTGRESQL);
        String password =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_POSTGRESQL_PASSWORD,
                        DataSourceType.POSTGRESQL);

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.postgresql.Driver");
        dataSourceBuilder.url(url);
        dataSourceBuilder.username(username);
        dataSourceBuilder.password(password);
        return dataSourceBuilder.build();
    }

    private DataSource sqlserverDataSource() {
        String url =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_SQLSERVER_URL, DataSourceType.SQLSERVER);
        String username =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_SQLSERVER_USERNAME,
                        DataSourceType.SQLSERVER);
        String password =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_SQLSERVER_PASSWORD,
                        DataSourceType.SQLSERVER);

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        dataSourceBuilder.url(url);
        dataSourceBuilder.username(username);
        dataSourceBuilder.password(password);
        return dataSourceBuilder.build();
    }

    private DataSource mariadbDataSource() {
        String url =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_MARIADB_URL, DataSourceType.MARIADB);
        String username =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_MARIADB_USERNAME, DataSourceType.MARIADB);
        String password =
                this.getRequiredOrThrow(
                        CommonEnvConstants.BLAZINGKRAFT_DATASOURCE_MARIADB_PASSWORD, DataSourceType.MARIADB);

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.mariadb.jdbc.Driver");
        dataSourceBuilder.url(url);
        dataSourceBuilder.username(username);
        dataSourceBuilder.password(password);
        return dataSourceBuilder.build();
    }

    private String getRequiredOrThrow(String key, DataSourceType dataSourceType) {
        try {
            return this.environment.getRequiredProperty(key);
        } catch (IllegalStateException ex) {
            String errorMessage =
                    String.format(
                            "Environment Variable '%s' is required when using datasource type '%s'.",
                            key, dataSourceType.name());
            log.error(CommonLogUtils.getError(errorMessage));
            throw new DataSourceException(ex, errorMessage);
        }
    }
}
