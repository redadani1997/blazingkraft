package com.redadani1997.blazingkraft.common.util;

import java.util.Timer;
import java.util.TimerTask;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonTimerUtils {

    public static TimerTask startTimer(String name, long delay, Runnable runnable) {
        TimerTask task =
                new TimerTask() {
                    public void run() {
                        runnable.run();
                    }
                };

        Timer timer = new Timer(name);

        timer.schedule(task, delay);

        return task;
    }

    public static void cancelTimer(TimerTask task) {
        task.cancel();
    }
}
