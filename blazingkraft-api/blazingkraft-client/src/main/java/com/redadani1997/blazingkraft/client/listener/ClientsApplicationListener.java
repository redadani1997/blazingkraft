package com.redadani1997.blazingkraft.client.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.CleanUpApplicationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientsApplicationListener {
    private final ClientsFactory clientsFactory;

    @EventListener
    public void cleanUpApplicationEvent(CleanUpApplicationEvent eventData) {
        this.clientsFactory.cleanUp();
    }
}
