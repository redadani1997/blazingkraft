package com.redadani1997.blazingkraft.error.common;

public class ObjectIsEmptyException extends CommonException {
    public ObjectIsEmptyException(String attribute) {
        super(computeMessage(attribute));
    }

    private static String computeMessage(String attribute) {
        return String.format("Value cannot be empty for attribute '%s'", attribute);
    }
}
