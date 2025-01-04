package com.redadani1997.blazingkraft.common.future;

import com.redadani1997.blazingkraft.error.admin.AdminException;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import lombok.experimental.UtilityClass;

@UtilityClass
public class KafkaFutureUtils {
    public static <T> T resolve(Future<T> future, KafkaFutureMode kafkaFutureMode) {
        try {
            return future.get();
        } catch (ExecutionException ex) {
            Throwable rootCause = ex.getCause() != null ? ex.getCause() : ex;
            throw getException(kafkaFutureMode, rootCause);
        } catch (InterruptedException ex) {
            throw new RuntimeException("Operation execution was interrupted!", ex);
        }
    }

    public RuntimeException getException(KafkaFutureMode kafkaFutureMode, Throwable ex) {
        switch (kafkaFutureMode) {
            case ADMIN:
                return new AdminException(ex);
            case PRODUCER:
                return new ProducerException(ex);
            default:
                return new RuntimeException(ex);
        }
    }
}
