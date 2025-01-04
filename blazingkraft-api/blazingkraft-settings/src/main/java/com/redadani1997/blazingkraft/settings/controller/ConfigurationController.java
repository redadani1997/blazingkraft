package com.redadani1997.blazingkraft.settings.controller;

import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.settings.configuration.openapi.api.ConfigurationApi;
import com.redadani1997.blazingkraft.settings.configuration.openapi.model.ConfigurationApiResponse;
import com.redadani1997.blazingkraft.settings.service.ConfigurationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConfigurationController implements ConfigurationApi {

    private final ConfigurationService configurationService;

    @WithCleanUp
    @Override
    public ResponseEntity<ConfigurationApiResponse> getConfiguration() {
        ConfigurationApiResponse response = this.configurationService.getConfiguration();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
