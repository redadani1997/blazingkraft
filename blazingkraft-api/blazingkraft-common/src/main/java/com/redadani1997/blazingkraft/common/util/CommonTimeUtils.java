package com.redadani1997.blazingkraft.common.util;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonTimeUtils {
    private static final DateTimeFormatter DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH-mm-ss-SSSZ");

    public static String nowFormatted() {
        return ZonedDateTime.now(ZoneId.of("UTC")).format(DATE_TIME_FORMATTER);
    }

    public static Long now() {
        return System.currentTimeMillis();
    }
}
