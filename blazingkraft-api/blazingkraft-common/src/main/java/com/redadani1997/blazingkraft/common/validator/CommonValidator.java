package com.redadani1997.blazingkraft.common.validator;

import com.redadani1997.blazingkraft.error.common.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonValidator {

    public static void assertNotNull(String attribute, Object value) {
        if (value == null) {
            throw new ObjectIsNullException(attribute);
        }
    }

    public static void assertNotEmpty(String attribute, String value) {
        assertNotNull(attribute, value);
        if (value.isEmpty()) {
            throw new ObjectIsEmptyException(attribute);
        }
    }

    public static void assertNotEmpty(String attribute, List value) {
        assertNotNull(attribute, value);
        if (value.isEmpty()) {
            throw new ObjectIsEmptyException(attribute);
        }
    }

    public static void assertNotBlank(String attribute, String value) {
        assertNotNull(attribute, value);
        assertNotEmpty(attribute, value);
        if (value.isBlank()) {
            throw new ObjectIsBlankException(attribute);
        }
    }

    public static void assertEquals(String attribute, Object value, Object expected) {
        if (value == null) {
            throw new ObjectIsNullException(attribute);
        }
        if (!value.equals(expected)) {
            throw new NonEqualityException(attribute, expected);
        }
    }

    public static void assertGreaterThanOrEquals(String attribute, Long value, Long expected) {
        if (value == null) {
            throw new ObjectIsNullException(attribute);
        }
        if (value < expected) {
            throw new NumberComparisonException(
                    String.format(
                            "Value for attribute '%s' should be greater or equals '%s'", attribute, expected));
        }
    }

    public static void assertLessThanOrEquals(String attribute, Long value, Long expected) {
        if (value == null) {
            throw new ObjectIsNullException(attribute);
        }
        if (value > expected) {
            throw new NumberComparisonException(
                    String.format(
                            "Value for attribute '%s' should be less or equals '%s'", attribute, expected));
        }
    }

    public static void assertListSizeLessThanOrEquals(
            String attribute, List<? extends Object> value, Long expected) {
        if (value == null) {
            throw new ObjectIsNullException(attribute);
        }
        if (value.size() > expected) {
            throw new NumberComparisonException(
                    String.format(
                            "Number of elements for attribute '%s' should be less or equals '%s'",
                            attribute, expected));
        }
    }

    public static void assertTwoWayEquals(
            String firstAttribute, String secondAttribute, Object firstValue, Object secondValue) {
        if (firstValue == null) {
            throw new ObjectIsNullException(firstAttribute);
        }
        if (secondValue == null) {
            throw new ObjectIsNullException(secondAttribute);
        }
        if (!firstValue.equals(secondValue)) {
            throw new TwoWayNonEqualityException(firstAttribute, secondAttribute);
        }
    }

    public static void assertExpression(String attribute, String value, String expression) {
        assertNotBlank("Regex", value);

        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(value);
        boolean matchFound = matcher.find();

        if (!matchFound) {
            throw new RegexMatchException(attribute, expression);
        }
    }
}
