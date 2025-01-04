package com.redadani1997.blazingkraft.common.util;

import com.redadani1997.blazingkraft.error.common.ReflectionUtilException;
import java.lang.reflect.Field;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.ClassUtils;

@UtilityClass
public class CommonReflectionUtils {
    public void setField(Object object, String fieldName, Object value) {
        try {
            Class clazz = object.getClass();
            Field field = null;
            while (clazz != null && field == null) {
                try {
                    field = clazz.getDeclaredField(fieldName);
                } catch (NoSuchFieldException e) {
                    clazz = clazz.getSuperclass();
                }
            }
            if (field == null) {
                throw new ReflectionUtilException("Field not found: " + fieldName);
            }
            field.setAccessible(true);
            field.set(object, value);
        } catch (Exception ex) {
            throw new ReflectionUtilException(
                    String.format(
                            "Could not set field '%s' for class '%s' using reflection",
                            fieldName, object.getClass()));
        }
    }

    public boolean isPrimitive(Object object) {
        if (object == null) {
            return false;
        }
        if (object instanceof String) {
            return true;
        }
        return ClassUtils.isPrimitiveOrWrapper(object.getClass());
    }
}
