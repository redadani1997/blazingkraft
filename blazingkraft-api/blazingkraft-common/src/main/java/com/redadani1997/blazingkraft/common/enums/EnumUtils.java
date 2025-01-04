package com.redadani1997.blazingkraft.common.enums;

import com.redadani1997.blazingkraft.error.common.EnumNotFoundException;
import com.redadani1997.blazingkraft.error.common.ObjectIsNullException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.experimental.UtilityClass;

@UtilityClass
public class EnumUtils {

    public static <T extends Enum<T>> T fromNameNotNull(Class<T> enumType, String name) {
        if (name == null) {
            throw new ObjectIsNullException(enumType.getSimpleName());
        }
        try {
            return Enum.valueOf(enumType, name);
        } catch (IllegalArgumentException ex) {
            throw new EnumNotFoundException(enumType, name);
        }
    }

    public static <T extends Enum<T>> T fromName(Class<T> enumType, String name) {
        if (name == null) {
            return null;
        }
        try {
            return Enum.valueOf(enumType, name);
        } catch (IllegalArgumentException ex) {
            throw new EnumNotFoundException(enumType, name);
        }
    }

    public static <T extends Enum<T>> void validateName(Class<T> enumType, String name) {
        if (name == null) {
            return;
        }
        try {
            Enum.valueOf(enumType, name);
        } catch (IllegalArgumentException ex) {
            throw new EnumNotFoundException(enumType, name);
        }
    }

    public static <T extends Enum<T>> T fromName(Class<T> enumType, String name, T defaultValue) {
        T result = fromName(enumType, name);
        return result != null ? result : defaultValue;
    }

    public static String getNameOrNull(Enum value) {
        if (value == null) {
            return null;
        }
        return value.name();
    }

    public static String toName(Enum e) {
        return e != null ? e.name() : null;
    }

    public static List<String> toNames(Collection<? extends Enum> enums) {
        if (enums == null) {
            return Collections.EMPTY_LIST;
        }
        return enums.stream().map(EnumUtils::toName).collect(Collectors.toList());
    }
}
