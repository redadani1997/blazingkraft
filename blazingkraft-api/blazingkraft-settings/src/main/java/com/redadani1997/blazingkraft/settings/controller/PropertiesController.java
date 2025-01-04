package com.redadani1997.blazingkraft.settings.controller;

import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.settings.properties.openapi.api.PropertiesApi;
import com.redadani1997.blazingkraft.settings.properties.openapi.model.PropertiesApiResponse;
import com.redadani1997.blazingkraft.settings.service.PropertiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PropertiesController implements PropertiesApi {

    private final PropertiesService propertiesService;

    @WithCleanUp
    @Override
    public ResponseEntity<PropertiesApiResponse> getProperties() {
        PropertiesApiResponse response = this.propertiesService.getProperties();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
