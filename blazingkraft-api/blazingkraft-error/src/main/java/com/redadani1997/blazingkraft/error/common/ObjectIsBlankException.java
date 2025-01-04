package com.redadani1997.blazingkraft.error.common;

public class ObjectIsBlankException extends CommonException {

    public ObjectIsBlankException(String attribute) {
        super(computeMessage(attribute));
    }

    private static String computeMessage(String attribute) {
        return String.format("Value cannot be blank for attribute '%s'", attribute);
    }
}
