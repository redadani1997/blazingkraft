package com.redadani1997.blazingkraft.common.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.experimental.UtilityClass;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@UtilityClass
public class CommonRequestUtils {
    private static String currentPath = null;

    public static String currentPath() {
        if (currentPath != null) {
            return currentPath;
        }
        initCurrentPath();
        return currentPath;
    }

    public static void initCurrentPath() {
        if (currentPath == null) {
            HttpServletRequest request =
                    ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String contextPath = request.getContextPath();
            String scheme = request.getScheme();
            int port = request.getServerPort();
            currentPath = scheme + "://" + request.getServerName() + ":" + port + contextPath;
        }
    }
}
