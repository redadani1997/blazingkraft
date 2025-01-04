package com.redadani1997.blazingkraft.error.common;

import java.util.Map;

public class MapToStringTransformException extends CommonException {
    public MapToStringTransformException(Map map) {
        super(computeMessage(map));
    }

    private static String computeMessage(Map map) {
        return String.format("Cannot transform Map => '%s' to String", map.toString());
    }
}
