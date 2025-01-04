package com.redadani1997.blazingkraft.cleanup.decorator.aspect;

import com.redadani1997.blazingkraft.cleanup.service.CleanUpService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(0)
@RequiredArgsConstructor
public class WithCleanUpAspect {

    private final CleanUpService cleanUpService;

    @Before("@annotation(com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp)")
    public void withCleanUpAspect(JoinPoint joinPoint) {
        // Spring uses a reusable thread pool, therefore we need to clear the thread local
        // variables after each request (aka each thread.run() invocation)

        this.cleanUpService.cleanUp();
    }
}
