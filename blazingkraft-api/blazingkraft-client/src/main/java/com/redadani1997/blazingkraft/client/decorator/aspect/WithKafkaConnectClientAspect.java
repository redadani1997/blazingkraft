package com.redadani1997.blazingkraft.client.decorator.aspect;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.currentcode.CurrentCode;
import com.redadani1997.blazingkraft.common.application_event.KafkaConnectAssignedApplicationEvent;
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
public class WithKafkaConnectClientAspect {

    private final ClientsFactory clientsFactory;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectClient)")
    public void withKafkaConnectClientAspect(JoinPoint joinPoint) {
        String kafkaConnectCode = getKafkaConnectCode();

        KafkaConnectAssignedApplicationEvent event =
                new KafkaConnectAssignedApplicationEvent(kafkaConnectCode);
        this.applicationEventPublisher.publishEvent(event);
    }

    private String getKafkaConnectCode() {
        CurrentCode currentCode = this.clientsFactory.currentCode();
        if (currentCode == null) {
            throw new ClientsException("No Kafka Connect Code provided!");
        }
        return currentCode.getCode();
    }
}
