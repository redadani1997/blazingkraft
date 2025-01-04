package com.redadani1997.blazingkraft.dao.configuration;

import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.enums.DataSourceType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.api.exception.FlywayValidateException;
import org.springframework.boot.autoconfigure.flyway.FlywayConfigurationCustomizer;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class FlywayConfiguration {
    private final JdbcDatasourceConfiguration jdbcDatasourceConfiguration;

    @Bean
    @DependsOn("flywayConfigurationCustomizer")
    public FlywayMigrationStrategy flywayMigrationStrategy() {
        return (flyway) -> {
            try {
                //                flyway.repair();
                flyway.migrate();
            } catch (FlywayValidateException ex) {
                String errorMessage =
                        "Error while validating flyway_schema_history integrity.\n"
                                + "This is most likely due to an error on server side.\n"
                                + "Please check the stacktrace for more details.\n"
                                + "As a workaround you can clear the flyway_schema_history table (DELETE FROM flyway_schema_history)"
                                + " and restart the application as it will have no side effects.\n"
                                + "In case you're using the H2 embedded database just delete the configured database folder "
                                + "and restart the application, sadly you will lose all the persisted data :(";
                log.error(CommonLogUtils.getError(errorMessage));
                throw ex;
            }
        };
    }

    @Bean
    @DependsOn("dataSource")
    public FlywayConfigurationCustomizer flywayConfigurationCustomizer() {
        return (configuration) -> {
            DataSourceType dataSourceType = this.jdbcDatasourceConfiguration.getDataSourceType();
            switch (dataSourceType) {
                case H2 -> configuration.locations("classpath:db/migration/h2");
                case MYSQL -> configuration.locations("classpath:db/migration/mysql");
                case POSTGRESQL -> configuration.locations("classpath:db/migration/postgresql");
                case SQLSERVER -> configuration.locations("classpath:db/migration/sqlserver");
                case MARIADB -> configuration.locations("classpath:db/migration/mariadb");
            }
            configuration.baselineOnMigrate(true);
            configuration.baselineVersion("1");
        };
    }
}
