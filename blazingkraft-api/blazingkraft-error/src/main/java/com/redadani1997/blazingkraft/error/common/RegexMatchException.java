package com.redadani1997.blazingkraft.error.common;

public class RegexMatchException extends CommonException {
    public RegexMatchException(String attribute, String expression) {
        super(computeMessage(attribute, expression));
    }

    private static String computeMessage(String attribute, String expression) {
        return String.format(
                "Value should match the Regex '%s' for attribute '%s'", expression, attribute);
    }
}
