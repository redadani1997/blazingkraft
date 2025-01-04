package com.redadani1997.blazingkraft.playground.controller;

import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.playground.dto.in.conversions.ContentConversionRequest;
import com.redadani1997.blazingkraft.playground.mapper.in.PlaygroundRequestMapper;
import com.redadani1997.blazingkraft.playground.mapper.in.conversions.PlaygroundConversionsRequestMapper;
import com.redadani1997.blazingkraft.playground.openapi.api.PlaygroundConversionsApi;
import com.redadani1997.blazingkraft.playground.openapi.model.*;
import com.redadani1997.blazingkraft.playground.service.PlaygroundConversionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PlaygroundConversionsController implements PlaygroundConversionsApi {
    private final PlaygroundConversionsService playgroundConversionsService;
    private final PlaygroundRequestMapper playgroundRequestMapper;

    @WithCleanUp
    @Override
    public ResponseEntity<ContentConversionApiResponse> convertContent(
            ContentConversionApiRequest apiRequest) {
        ContentConversionRequest request =
                this.playgroundConversionsRequestMapper().contentConversionRequest(apiRequest);

        ContentConversionApiResponse response =
                this.playgroundConversionsService.convertContent(request);

        return ResponseEntity.ok(response);
    }

    public PlaygroundConversionsRequestMapper playgroundConversionsRequestMapper() {
        return this.playgroundRequestMapper.playgroundConversionsRequestMapper();
    }
}
