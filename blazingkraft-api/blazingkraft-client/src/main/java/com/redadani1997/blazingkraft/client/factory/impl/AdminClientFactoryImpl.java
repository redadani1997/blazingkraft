package com.redadani1997.blazingkraft.client.factory.impl;

import com.redadani1997.blazingkraft.client.factory.AdminClientFactory;
import com.redadani1997.blazingkraft.client.validator.AdminClientConfigurationValidator;
import java.util.Map;
import org.apache.kafka.clients.admin.Admin;
import org.springframework.stereotype.Component;

@Component
public class AdminClientFactoryImpl implements AdminClientFactory {

    private final AdminClientConfigurationValidator adminClientConfigurationValidator;

    public AdminClientFactoryImpl(
            AdminClientConfigurationValidator adminClientConfigurationValidator) {
        this.adminClientConfigurationValidator = adminClientConfigurationValidator;
    }

    @Override
    public Admin createAdminClient(Map<String, Object> configuration) {
        Map<String, Object> computedConfiguration =
                this.adminClientConfigurationValidator.validateAndCompute(configuration);
        Admin admin = Admin.create(computedConfiguration);
        return admin;
    }
}
