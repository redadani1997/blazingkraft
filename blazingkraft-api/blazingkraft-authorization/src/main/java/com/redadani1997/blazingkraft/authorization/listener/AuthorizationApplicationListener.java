package com.redadani1997.blazingkraft.authorization.listener;

import com.redadani1997.blazingkraft.authorization.facade.CurrentUserFacade;
import com.redadani1997.blazingkraft.common.application_event.CleanUpApplicationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthorizationApplicationListener {
    private final CurrentUserFacade currentUserFacade;

    @EventListener
    public void cleanUpApplicationEvent(CleanUpApplicationEvent eventData) {
        this.currentUserFacade.cleanUp();
    }
}
