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
public class WithKsqlDbCodeAspect {

    private final ClientsFactory clientsFactory;

    @Before("@annotation(com.redadani1997.blazingkraft.client.decorator.WithKsqlDbCode)")
    public void withKsqlDbCodeAspect(JoinPoint joinPoint) {
        HttpServletRequest request =
                ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String ksqlDbCode = getKsqlDbCode(request);

        if (ksqlDbCode != null) {
            CurrentCode currentCode = new CurrentCode(ksqlDbCode, EntityType.KSQLDB);
            this.clientsFactory.setCurrentCode(currentCode);
        }
    }

    private String getKsqlDbCode(HttpServletRequest request) {
        return request.getHeader("ksqlDbCode");
    }
}
