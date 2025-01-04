package com.redadani1997.blazingkraft.error.common;

public class NonEqualityException extends CommonException {
    public NonEqualityException(String attribute, Object expected) {
        super(computeMessage(attribute, expected));
    }

    private static String computeMessage(String attribute, Object expected) {
        return String.format(
                "Value should be equal to '%s' for attribute '%s'", String.valueOf(expected), attribute);
    }
}
