package com.redadani1997.blazingkraft.client.decorator.aspect;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.application_event.ConsumerAssignedApplicationEvent;
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
public class WithConsumerClientAspect {

    private final ClientsFactory clientsFactory;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithConsumerClient)")
    public void withConsumerClientAspect(JoinPoint joinPoint) {
        String clusterCode = getClusterCode();

        ConsumerAssignedApplicationEvent event = new ConsumerAssignedApplicationEvent(clusterCode);
        this.applicationEventPublisher.publishEvent(event);
    }

    private String getClusterCode() {
        CurrentCode currentCode = this.clientsFactory.currentCode();
        if (currentCode == null) {
            throw new ClientsException("No Cluster Code provided!");
        }
        return currentCode.getCode();
    }
}
