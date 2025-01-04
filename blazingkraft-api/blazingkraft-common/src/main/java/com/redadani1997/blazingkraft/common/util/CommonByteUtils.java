package com.redadani1997.blazingkraft.common.util;

import com.redadani1997.blazingkraft.error.common.ByteUtilException;
import java.nio.charset.StandardCharsets;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.SerializationUtils;

@UtilityClass
public class CommonByteUtils {

    // Object to byte array
    public static byte[] toByteArray(Object object) {
        if (object == null) {
            return null;
        }
        try {
            if (object instanceof String str) {
                return str.getBytes(StandardCharsets.UTF_8);
            }
            if (object instanceof Double d) {
                return toByteArray(d.toString());
            }
            if (object instanceof Integer i) {
                return toByteArray(i.toString());
            }
            if (object instanceof Long l) {
                return toByteArray(l.toString());
            }
            if (object instanceof Float f) {
                return toByteArray(f.toString());
            }
            if (object instanceof Boolean b) {
                return toByteArray(b.toString());
            }
            if (object instanceof Short s) {
                return toByteArray(s.toString());
            }
            String stringOrNull = CommonCastingUtils.toJsonStringOrNull(object);
            if (stringOrNull != null) {
                return toByteArray(stringOrNull);
            }
            return null;
        } catch (Exception ex) {
            throw new ByteUtilException(String.format("Failed to serialize '%s' to byte array", object));
        }
    }

    public static byte[] toByteArrayOrNull(Object object) {
        try {
            return toByteArray(object);
        } catch (Exception ex) {
            return null;
        }
    }

    // Byte array to object
    public static Object toObject(byte[] bytes) {
        if (bytes == null) {
            return null;
        }
        try {
            return SerializationUtils.deserialize(bytes);
        } catch (Exception ex) {
            throw new ByteUtilException(String.format("Failed to deserialize byte array to object"));
        }
    }

    // Byte array to object
    public static String toString(byte[] bytes) {
        if (bytes == null) {
            return null;
        }
        try {
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception ex) {
            throw new ByteUtilException("Failed to deserialize byte array to String");
        }
    }
}
