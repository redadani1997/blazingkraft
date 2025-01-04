package com.redadani1997.blazingkraft.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.redadani1997.blazingkraft.*")
@EnableJpaRepositories("com.redadani1997.blazingkraft.dao.*")
@EntityScan("com.redadani1997.blazingkraft.dao.*")
public class BlazingKraftCore {
    public static void main(String[] args) {
        SpringApplication.run(BlazingKraftCore.class, args);
    }
}
