package com.redadani1997.blazingkraft.common.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonEqualityUtils {

    public static boolean equals(Object o1, Object o2) {
        if (o1 == null && o2 == null) {
            return true;
        }
        if (o1 == null) {
            return false;
        }
        if (o2 == null) {
            return false;
        }
        return o1.equals(o2);
    }

    public static boolean notEquals(Object o1, Object o2) {
        return !equals(o1, o2);
    }
}
