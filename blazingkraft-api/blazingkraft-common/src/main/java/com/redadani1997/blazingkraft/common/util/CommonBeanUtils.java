package com.redadani1997.blazingkraft.common.util;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;

@UtilityClass
@Slf4j
public class CommonBeanUtils {
    public static <T> T getBean(ApplicationContext applicationContext, Class<T> clazz) {
        return applicationContext.getBean(clazz);
    }

    public static Long getLongEnvVariable(
            ApplicationContext applicationContext, String envVariable, Long defaultValue) {
        String envVariableValue = applicationContext.getEnvironment().getProperty(envVariable);
        Long result = defaultValue;
        if (envVariableValue != null) {
            try {
                log.info(
                        CommonLogUtils.getInfo(
                                String.format(
                                        "Found Env Variable '%s' with value '%s'.", envVariable, envVariableValue)));
                result = Long.parseLong(envVariableValue);
            } catch (NumberFormatException ex) {
                log.error(
                        CommonLogUtils.getError(
                                String.format(
                                        "Error while parsing env variable '%s' with value '%s' to long, with error '%s', defaulting to '%s'",
                                        envVariable, envVariableValue, ex.getMessage(), defaultValue)));
            }
        }
        return result;
    }
}
