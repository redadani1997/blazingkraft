package com.redadani1997.blazingkraft.common.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonLogUtils {
    public static String getError(String base) {
        return "\n\n"
                + "################################### BLAZING ERROR ######################################"
                + "\n"
                + base
                + "\n"
                + "########################################################################################\n";
    }

    public static String getWarning(String base) {
        return "\n\n"
                + "################################### BLAZING WARNING ####################################"
                + "\n"
                + base
                + "\n"
                + "########################################################################################\n";
    }

    public static String getInfo(String base) {
        return "\n\n"
                + "################################### BLAZING INFO #######################################"
                + "\n"
                + base
                + "\n"
                + "########################################################################################\n";
    }

    public static String getDebug(String base) {
        return "\n\n"
                + "################################### BLAZING DEBUG ######################################"
                + "\n"
                + base
                + "\n"
                + "########################################################################################\n";
    }
}
