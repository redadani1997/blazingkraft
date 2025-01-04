package com.redadani1997.blazingkraft.generator.utils;

import java.util.HashMap;
import java.util.Map;

public class GeneratorUnit {
    public enum BlazingGeneratorNumericUnit {
        BYTES,
        MILLISECONDS,
        SECONDS,
        UNIT
    }

    public static Map<String, BlazingGeneratorNumericUnit> numericConfigurationUnit = new HashMap<>();

    static {
        numericConfigurationUnit.put(
                "sasl.kerberos.min.time.before.relogin", BlazingGeneratorNumericUnit.MILLISECONDS);
        numericConfigurationUnit.put("buffer.memory", BlazingGeneratorNumericUnit.BYTES);
        numericConfigurationUnit.put("batch.size", BlazingGeneratorNumericUnit.BYTES);
        numericConfigurationUnit.put("max.request.size", BlazingGeneratorNumericUnit.BYTES);

        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
        //        numericConfigurationUnit.put("", BlazingGeneratorNumericUnit.MILLISECONDS);
    }
}
