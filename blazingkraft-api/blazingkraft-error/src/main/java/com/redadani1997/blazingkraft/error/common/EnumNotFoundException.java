package com.redadani1997.blazingkraft.error.common;

import java.util.Arrays;

public class EnumNotFoundException extends CommonException {

    public EnumNotFoundException(Class enumType, String name) {
        super(computeMessage(enumType, name));
    }

    private static String computeMessage(Class enumType, String name) {
        return String.format(
                "Value '%s' for type '%s' must be one of '%s'",
                name, enumType.getSimpleName(), Arrays.toString(enumType.getEnumConstants()));
    }
}
