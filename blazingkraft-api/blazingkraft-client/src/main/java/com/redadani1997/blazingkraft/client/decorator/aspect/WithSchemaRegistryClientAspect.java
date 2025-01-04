package com.redadani1997.blazingkraft.client.decorator.aspect;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.application_event.SchemaRegistryAssignedApplicationEvent;
import com.redadani1997.blazingkraft.error.client.ClientsException;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(5)
@RequiredArgsConstructor
public class WithSchemaRegistryClientAspect {

    private final ClientsFactory clientsFactory;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithSchemaRegistryClient)")
    public void withSchemaRegistryClientAspect(JoinPoint joinPoint) {
        String schemaRegistryCode = getSchemaRegistryCode();

        SchemaRegistryAssignedApplicationEvent event =
                new SchemaRegistryAssignedApplicationEvent(schemaRegistryCode);
        this.applicationEventPublisher.publishEvent(event);
    }

    private String getSchemaRegistryCode() {
        CurrentCode currentCode = this.clientsFactory.currentCode();
        if (currentCode == null) {
            throw new ClientsException("No Schema Registry Code provided!");
        }
        return currentCode.getCode();
    }
}
