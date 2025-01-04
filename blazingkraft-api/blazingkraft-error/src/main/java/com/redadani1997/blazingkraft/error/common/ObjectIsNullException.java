package com.redadani1997.blazingkraft.error.common;

public class ObjectIsNullException extends CommonException {
    public ObjectIsNullException(String attribute) {
        super(computeMessage(attribute));
    }

    private static String computeMessage(String attribute) {
        return String.format("Value cannot be null for attribute '%s'", attribute);
    }
}
