package com.redadani1997.blazingkraft.cleanup.service.impl;

import com.redadani1997.blazingkraft.cleanup.service.CleanUpService;
import com.redadani1997.blazingkraft.common.application_event.CleanUpApplicationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CleanUpServiceImpl implements CleanUpService {
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    public void cleanUp() {
        // Spring uses a reusable thread pool, therefore we need to clear the thread local
        // variables after each request (aka each thread.run() invocation)
        CleanUpApplicationEvent event = new CleanUpApplicationEvent();
        this.applicationEventPublisher.publishEvent(event);
    }
}
