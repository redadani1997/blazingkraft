package com.redadani1997.blazingkraft.client.decorator.aspect;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
@Order(3)
@RequiredArgsConstructor
public class WithSchemaRegistryCodeAspect {

    private final ClientsFactory clientsFactory;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryCode)")
    public void withSchemaRegistryCodeAspect(JoinPoint joinPoint) {
        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        String schemaRegistryCode = getSchemaRegistryCode(request);

        if (schemaRegistryCode != null) {
            CurrentCode currentCode = new CurrentCode(schemaRegistryCode, EntityType.SCHEMA_REGISTRY);
            this.clientsFactory.setCurrentCode(currentCode);
        }
    }

    private String getSchemaRegistryCode(HttpServletRequest request) {
        return request.getHeader("schemaRegistryCode");
    }
}
