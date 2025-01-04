package com.redadani1997.blazingkraft.core.health;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {
    @GetMapping
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> healthResponse = Map.of("status", "UP");
        return ResponseEntity.ok(healthResponse);
    }
}
