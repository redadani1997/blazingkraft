package com.redadani1997.blazingkraft.error.common;

public class TwoWayNonEqualityException extends CommonException {
    public TwoWayNonEqualityException(String firstAttribute, String secondAttribute) {
        super(computeMessage(firstAttribute, firstAttribute));
    }

    private static String computeMessage(String firstAttribute, Object secondAttribute) {
        return String.format(
                "Values should be equal for the attributes '%s' '%s'", firstAttribute, secondAttribute);
    }
}
