package com.redadani1997.blazingkraft.client.decorator.aspect;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.application_event.KsqlDbAssignedApplicationEvent;
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
public class WithKsqlDbClientAspect {

    private final ClientsFactory clientsFactory;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithKsqlDbClient)")
    public void withKsqlDbClientAspect(JoinPoint joinPoint) {
        String ksqlDbCode = getKsqlDbCode();

        KsqlDbAssignedApplicationEvent event = new KsqlDbAssignedApplicationEvent(ksqlDbCode);
        this.applicationEventPublisher.publishEvent(event);
    }

    private String getKsqlDbCode() {
        CurrentCode currentCode = this.clientsFactory.currentCode();
        if (currentCode == null) {
            throw new ClientsException("No KsqlDb Code provided!");
        }
        return currentCode.getCode();
    }
}
