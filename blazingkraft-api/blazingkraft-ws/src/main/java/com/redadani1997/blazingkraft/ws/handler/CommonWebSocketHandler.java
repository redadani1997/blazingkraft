package com.redadani1997.blazingkraft.ws.handler;

import com.redadani1997.blazingkraft.common.current_user.CurrentUser;
import com.redadani1997.blazingkraft.common.util.CommonTimerUtils;
import com.redadani1997.blazingkraft.ws.frame.CommonFrameType;
import java.util.function.BiConsumer;
import org.springframework.context.ApplicationContext;

public abstract class CommonWebSocketHandler {

    protected final ApplicationContext applicationContext;
    private final Runnable sessionCloser;
    private final BiConsumer<CommonFrameType, Object> messageSender;
    private final CurrentUser currentUser;
    private final String destination;

    public CommonWebSocketHandler(
            ApplicationContext applicationContext,
            Runnable sessionCloser,
            BiConsumer<CommonFrameType, Object> messageSender,
            CurrentUser currentUser,
            String destination) {
        this.applicationContext = applicationContext;
        this.sessionCloser = sessionCloser;
        this.messageSender = messageSender;
        this.currentUser = currentUser;
        this.destination = destination;
        CommonTimerUtils.startTimer(
                String.format("Consumer '%s' timer", destination),
                1000 * 60 * 60 * 2,
                () -> {
                    this.messageSender.accept(
                            CommonFrameType.FAILED,
                            "You've been consuming for more than 2 hours, rerun the consumer again!");
                    this.sessionCloser.run();
                });
    }

    public void onMessage(Object message) {
        // no-op
    }

    public abstract void onSubscribe(String requestBody);

    public abstract void onDisconnect();

    public String getDestination() {
        return this.destination;
    }

    protected void closeSession() {
        try {
            // Wait for 12 seconds to close the session because the client may not be ready
            // to disconnect gracefully.
            Thread.sleep(12000);
        } catch (Exception e) {
            // no-op
        }
        this.sessionCloser.run();
    }

    protected void sendMessage(CommonFrameType type, Object payload) {
        this.messageSender.accept(type, payload);
    }

    protected CurrentUser currentUser() {
        return this.currentUser;
    }
}
