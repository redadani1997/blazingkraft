package com.redadani1997.blazingkraft.authorization.decorator.aspect;

import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.authorization.service.AuthorizationService;
import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import java.lang.reflect.Method;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(4)
public class WithAuthorizationAspect {

    private final AuthorizationService commonAuthorizationService;
    private final CurrentUserFacade currentUserFacade;

    public WithAuthorizationAspect(
            @Qualifier("commonAuthorizationService") AuthorizationService commonAuthorizationService,
            CurrentUserFacade currentUserFacade) {
        this.commonAuthorizationService = commonAuthorizationService;
        this.currentUserFacade = currentUserFacade;
    }

    @Before("@annotation(com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization)")
    public void withAuthorization(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        WithAuthorization annotation = method.getAnnotation(WithAuthorization.class);
        String requiredPermission = annotation.permission();
        EntityType type = annotation.type();

        CurrentUser currentUser = this.currentUserFacade.currentUser();

        this.commonAuthorizationService.authorize(currentUser, requiredPermission, type);
    }
}
