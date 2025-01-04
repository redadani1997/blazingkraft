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
public class WithKafkaConnectCodeAspect {

    private final ClientsFactory clientsFactory;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithKafkaConnectCode)")
    public void withKafkaConnectCodeAspect(JoinPoint joinPoint) {
        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        String kafkaConnectCode = getKafkaConnectCode(request);

        if (kafkaConnectCode != null) {
            CurrentCode currentCode = new CurrentCode(kafkaConnectCode, EntityType.KAFKA_CONNECT);
            this.clientsFactory.setCurrentCode(currentCode);
        }
    }

    private String getKafkaConnectCode(HttpServletRequest request) {
        return request.getHeader("kafkaConnectCode");
    }
}
