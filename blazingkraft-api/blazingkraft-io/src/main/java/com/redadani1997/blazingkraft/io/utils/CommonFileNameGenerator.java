package com.redadani1997.blazingkraft.io.utils;

import com.redadani1997.blazingkraft.common.util.CommonTimeUtils;

public class CommonFileNameGenerator {
    public static String generateFileName(String base) {
        return String.format("%s_%s", base, CommonTimeUtils.nowFormatted());
    }

    public static String generateFileName(String base, String extension) {
        return String.format("%s_%s.%s", base, CommonTimeUtils.nowFormatted(), extension);
    }

    public static String generatePrefixedFileName(String base) {
        return String.format("%s_%s", CommonTimeUtils.nowFormatted(), base);
    }

    public static String stripExtension(String fileName) {
        if (fileName == null) return null;
        int pos = fileName.lastIndexOf(".");
        if (pos == -1) return fileName;
        return fileName.substring(0, pos);
    }
}
