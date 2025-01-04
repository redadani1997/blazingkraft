package com.redadani1997.blazingkraft.error.common;

public class StringToMapTransformException extends CommonException {

    public StringToMapTransformException(String string) {
        super(computeMessage(string));
    }

    private static String computeMessage(String string) {
        return String.format("Cannot transform String => '%s' to Map", string);
    }
}
