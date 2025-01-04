package com.redadani1997.blazingkraft.common.util;

import com.redadani1997.blazingkraft.error.management.GroupException;
import java.util.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonPermissionUtils {

    public static Map<String, List<String>> constructMapPermissions(String permissionsStr) {
        if (permissionsStr == null || permissionsStr.isEmpty()) {
            return Collections.emptyMap();
        }
        Map<String, List<String>> map = new HashMap<>();

        try {
            String[] permissions = permissionsStr.split(";;;");

            for (String fullPermission : permissions) {
                String[] permissionParts = fullPermission.split("___");
                if (permissionParts.length < 3) {
                    throw new GroupException(String.format("Invalid permission format '%s'", fullPermission));
                }
                String code = permissionParts[1];
                String permission = permissionParts[2];
                if (map.containsKey(code)) {
                    map.get(code).add(permission);
                } else {
                    List<String> newPermissionsList = new ArrayList<>();
                    newPermissionsList.add(permission);
                    map.put(code, newPermissionsList);
                }
            }
        } catch (Exception ex) {
            // no-op
            log.error(CommonLogUtils.getError(ex.getMessage()));
        }
        return map;
    }

    public static List<String> constructPermissions(String permissionsStr) {
        if (permissionsStr == null) {
            return Collections.emptyList();
        }
        return Arrays.asList(permissionsStr.split(";;;"));
    }

    public static List<String> generateCodePermissions(
            Map<String, List<String>> permissionsByCode, String prefix) {
        if (permissionsByCode == null || permissionsByCode.isEmpty()) {
            return null;
        }
        return permissionsByCode.entrySet().stream()
                .map(
                        entry ->
                                entry.getValue().stream()
                                        .map(permission -> prefix + "___" + entry.getKey() + "___" + permission)
                                        .toList())
                .flatMap(List::stream)
                .toList();
    }

    public static String concatPermissions(List<String> permissions) {
        if (permissions == null || permissions.isEmpty()) {
            return null;
        }
        return String.join(";;;", permissions);
    }
}
