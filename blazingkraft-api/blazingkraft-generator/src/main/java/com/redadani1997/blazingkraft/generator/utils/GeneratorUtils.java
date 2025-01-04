package com.redadani1997.blazingkraft.generator.utils;

import com.redadani1997.blazingkraft.generator.creators.CustomConfigKey;
import io.confluent.kafka.schemaregistry.utils.EnumRecommender;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.text.CaseUtils;
import org.apache.kafka.common.config.ConfigDef;

public class GeneratorUtils {

    public static void handleImports(
            List<Map.Entry<String, CustomConfigKey>> unsortedMain,
            List<Map.Entry<String, CustomConfigKey>> unsortedCommon,
            String output,
            String mainPath,
            String commonPath,
            String configName)
            throws IOException {

        List<Map.Entry<String, CustomConfigKey>> main =
                unsortedMain.stream().sorted(getComparator()).toList();

        List<Map.Entry<String, CustomConfigKey>> common =
                unsortedCommon.stream().sorted(getComparator()).toList();

        File dir = new File(output);
        if (dir.exists()) {
            dir.delete();
        }

        FileWriter fw = new FileWriter(output);

        List<String> exportedMainConfigs = new ArrayList<>();
        List<String> exportedCommonConfigs = new ArrayList<>();

        fw.write("// Main Config\n");
        for (Map.Entry<String, CustomConfigKey> config : main) {

            String configCamelCased = CaseUtils.toCamelCase(config.getKey(), false, '.');

            fw.write(
                    String.format("import %s from '%s%s';\n", configCamelCased, mainPath, config.getKey()));

            exportedMainConfigs.add(configCamelCased);
        }
        fw.write("// Common Config\n");
        for (Map.Entry<String, CustomConfigKey> config : common) {

            String configCamelCased = CaseUtils.toCamelCase(config.getKey(), false, '.');

            fw.write(
                    String.format("import %s from '%s%s';\n", configCamelCased, commonPath, config.getKey()));

            exportedCommonConfigs.add(configCamelCased);
        }

        fw.write("\n");
        fw.write("const main = [");
        for (String conf : exportedMainConfigs) {
            fw.write(String.format(" %s,\n", conf));
        }
        fw.write("]");

        fw.write("\n");
        fw.write("const common = [");
        for (String conf : exportedCommonConfigs) {
            fw.write(String.format(" %s,\n", conf));
        }
        fw.write("]\n\n");

        fw.write(String.format("const %s = { main, common };\n\n", configName));

        fw.write(String.format("export { %s };", configName));

        fw.close();
    }

    public static void printConfigurationFiles(
            List<Map.Entry<String, CustomConfigKey>> unsortedConfigs,
            String output,
            String configurationsName,
            String configurationsPath)
            throws IOException {

        List<Map.Entry<String, CustomConfigKey>> configs =
                unsortedConfigs.stream().sorted(getComparator()).toList();

        File dir = new File(output);
        if (dir.exists()) {
            deleteDirectory(output);
        }

        dir.mkdirs();

        for (Map.Entry<String, CustomConfigKey> config : configs) {
            FileWriter fw = new FileWriter(output + "/" + config.getKey() + ".tsx");

            handleTsImports(fw, config);

            fw.write("import { KafkaConfiguration } from '../..';\n\n");
            fw.write("const configuration: KafkaConfiguration = {\n");
            fw.write(String.format("\tname: '%s',\n", config.getKey()));
            fw.write(String.format("\tdisplayedName: '%s',\n", config.getValue().getDisplayedName()));
            fw.write(String.format("\terrorMessage: 'Please enter a valid value',\n"));

            handleDocumentation(fw, config);
            fw.write(
                    String.format(
                            "\timportance: '%s',\n", config.getValue().getConfigKey().importance.name()));
            handleSelectable(fw, config);
            fw.write(String.format("\trequired: false,\n"));
            fw.write(String.format("\ttype: '%s',\n", config.getValue().getConfigKey().type.toString()));
            fw.write(
                    String.format("\tdocumentationProps: %s,\n", config.getValue().getDocumentationProps()));
            handleDefaultValue(fw, config);
            handleOptions(fw, config);
            handleValidValues(fw, config);
            handleDisplayedDefaultValue(fw, config);
            handleValidate(fw, config);
            handleDisabledForever(fw, config);
            handleNumericUnit(fw, config);
            handleFileConfig(fw, config);
            fw.write(String.format("\tproTip: undefined,\n"));

            fw.write("};\n\n");
            fw.write("export default configuration;\n");

            fw.close();
        }

        handleImports(
                configs,
                "/home/reda/Desktop/projects/blazingkraft/blazingkraft-api/tmp/configuration/",
                configurationsName,
                configurationsPath);
    }

    private static void handleTsImports(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        String documentation = config.getValue().getConfigKey().documentation;
        String documentationProps = config.getValue().getDocumentationProps();
        if (documentation.contains("<code>")
                || documentation.contains("<code/>")
                || documentation.contains("</code>")
                || documentation.contains("{username}:{password}")) {
            if (documentationProps.contains("learn more by using their SerDes libraries")) {
                fw.write("import { Text, Code } from '@mantine/core';\n");
            } else {
                fw.write("import { Text, Code, Anchor } from '@mantine/core';\n");
            }
        } else {
            if (documentationProps.contains("learn more by using their SerDes libraries")) {
                fw.write("import { Text } from '@mantine/core';\n");
            } else {
                fw.write("import { Text, Anchor } from '@mantine/core';\n");
            }
        }
    }

    private static void handleFileConfig(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        if (GeneratorFile.fileConfiguration.contains(config.getKey())) {
            fw.write("\tisFileConfig: true,\n");
        }
    }

    public static void handleImports(
            List<Map.Entry<String, CustomConfigKey>> unsortedConfigs,
            String output,
            String configurationsName,
            String configurationsPath)
            throws IOException {

        List<Map.Entry<String, CustomConfigKey>> configs =
                unsortedConfigs.stream().sorted(getComparator()).toList();

        File dir = new File(output + configurationsName + ".tsx");
        if (dir.exists()) {
            dir.delete();
        }

        FileWriter fw = new FileWriter(output + configurationsName + ".tsx");

        List<String> exportedConfigs = new ArrayList<>();

        fw.write("// Configurations\n");
        for (Map.Entry<String, CustomConfigKey> config : configs) {

            String configCamelCased = CaseUtils.toCamelCase(config.getKey(), false, '.');

            fw.write(
                    String.format(
                            "import %s from '%s%s';\n", configCamelCased, configurationsPath, config.getKey()));

            exportedConfigs.add(configCamelCased);
        }

        fw.write("\n");
        fw.write("const configurations = [");
        for (String conf : exportedConfigs) {
            fw.write(String.format(" %s,\n", conf));
        }
        fw.write("]\n\n");

        fw.write(String.format("const %s = { configurations };\n\n", configurationsName));

        fw.write(String.format("export { %s };", configurationsName));

        fw.close();
    }

    private static Comparator<Map.Entry<String, CustomConfigKey>> getComparator() {
        Comparator<Map.Entry<String, CustomConfigKey>> nameComparator = Map.Entry.comparingByKey();
        Comparator<Map.Entry<String, CustomConfigKey>> importanceComparator =
                (a, b) -> {
                    if (ConfigDef.Importance.HIGH.equals(a.getValue().getConfigKey().importance)) {
                        return -1;
                    }
                    if (ConfigDef.Importance.MEDIUM.equals(a.getValue().getConfigKey().importance)
                            && ConfigDef.Importance.LOW.equals(b.getValue().getConfigKey().importance)) {
                        return -1;
                    }
                    if (a.getValue()
                            .getConfigKey()
                            .importance
                            .equals(b.getValue().getConfigKey().importance)) {
                        return 0;
                    }
                    return 1;
                };
        return nameComparator.thenComparing(importanceComparator);
    }

    private static void handleDisabledForever(
            FileWriter fw, Map.Entry<String, CustomConfigKey> config) throws IOException {
        fw.write(String.format("\tdisabledForever: %s,\n", "false"));
        //        if (ConfigDef.Type.CLASS.equals(config.getValue().getConfigKey().type)) {
        //            fw.write(String.format("\tdisabledForever: %s,\n", "true"));
        //        } else {
        //            fw.write(String.format("\tdisabledForever: %s,\n", "false"));
        //        }
    }

    private static void handleNumericUnit(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        if (List.of("INT", "SHORT", "LONG", "DOUBLE")
                .contains(config.getValue().getConfigKey().type.toString())) {
            if (config.getKey().endsWith(".ms")) {
                fw.write(
                        String.format(
                                "\tnumericUnit: '%s',\n", GeneratorUnit.BlazingGeneratorNumericUnit.MILLISECONDS));
                return;
            } else if (config.getKey().endsWith(".seconds")) {
                fw.write(
                        String.format(
                                "\tnumericUnit: '%s',\n", GeneratorUnit.BlazingGeneratorNumericUnit.SECONDS));
                return;
            } else if (config.getKey().endsWith(".bytes")) {
                fw.write(
                        String.format(
                                "\tnumericUnit: '%s',\n", GeneratorUnit.BlazingGeneratorNumericUnit.BYTES));
                return;
            }
        }
        if (GeneratorUnit.numericConfigurationUnit.containsKey(config.getKey())) {
            fw.write(
                    String.format(
                            "\tnumericUnit: '%s',\n",
                            GeneratorUnit.numericConfigurationUnit.get(config.getKey())));
            return;
        }

        fw.write(String.format("\tnumericUnit: undefined,\n"));
    }

    private static void handleDocumentation(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        String docs =
                config
                        .getValue()
                        .getConfigKey()
                        .documentation
                        .replace("<br>", "<br />")
                        .replace("<ul>", "")
                        .replace("</ul>", "")
                        .replace("<li>", "")
                        .replace("</li>", "")
                        .replace("<p>", "")
                        .replace("</p>", "")
                        .replace("<code>", "<Code>")
                        .replace("<topic>", "topic")
                        .replace("{username}:{password}", "<Code>username:password</Code>")
                        .replace("</code>", "</Code>")
                        .replace("<code/>", "</Code>");

        fw.write(String.format("\tdocumentation: <Text size=\"md\">%s</Text>,\n", docs));
    }

    private static void handleDefaultValue(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        Object defaultValue = config.getValue().getConfigKey().defaultValue;

        if (GeneratorDefaultValue.defaultValueOverrides.containsKey(config.getKey())) {
            defaultValue = GeneratorDefaultValue.defaultValueOverrides.get(config.getKey());
            fw.write(String.format("\toverriddenDefault: true,\n"));
        }

        if (defaultValue == null) {
            fw.write(String.format("\tdefault: null,\n"));
        } else if (String.valueOf(defaultValue).startsWith(Object.class.getName() + "@")) {
            fw.write(String.format("\tdefault: '%s',\n", ""));
        } else if (ConfigDef.Type.SHORT.equals(config.getValue().getConfigKey().type)
                || ConfigDef.Type.LONG.equals(config.getValue().getConfigKey().type)
                || ConfigDef.Type.INT.equals(config.getValue().getConfigKey().type)
                || ConfigDef.Type.DOUBLE.equals(config.getValue().getConfigKey().type)) {
            fw.write(String.format("\tdefault: '%s',\n", defaultValue));
        } else if (ConfigDef.Type.LIST.equals(config.getValue().getConfigKey().type)) {
            String NewDefault =
                    String.join(
                            ",", String.valueOf(defaultValue).replace("[", "").replace("]", "").split(", "));
            fw.write(String.format("\tdefault: '%s',\n", NewDefault));
        } else if (ConfigDef.Type.CLASS.equals(config.getValue().getConfigKey().type)) {
            if (defaultValue != null && defaultValue.getClass().equals(Class.class)) {
                fw.write(String.format("\tdefault: '%s',\n", ((Class) defaultValue).getCanonicalName()));
            } else {
                fw.write(String.format("\tdefault: '%s',\n", ""));
            }
        } else {
            fw.write(String.format("\tdefault: '%s',\n", defaultValue));
        }
    }

    private static void handleDisplayedDefaultValue(
            FileWriter fw, Map.Entry<String, CustomConfigKey> config) throws IOException {
        Object defaultValue = config.getValue().getConfigKey().defaultValue;
        if (String.valueOf(defaultValue).startsWith(Object.class.getName() + "@")) {
            fw.write(String.format("\tdisplayedDefault: '%s',\n", ""));
        } else if (ConfigDef.Type.CLASS.equals(config.getValue().getConfigKey().type)) {
            if (defaultValue != null && defaultValue.getClass().equals(Class.class)) {
                fw.write(
                        String.format(
                                "\tdisplayedDefault: '%s',\n", ((Class) defaultValue).getCanonicalName()));
            } else {
                fw.write(String.format("\tdisplayedDefault: '%s',\n", ""));
            }
        } else {
            fw.write(String.format("\tdisplayedDefault: '%s',\n", String.valueOf(defaultValue)));
        }
    }

    private static void handleValidate(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        if (config.getValue().getConfigKey().validator instanceof ConfigDef.ValidString) {
            String predicate =
                    List.of(
                                    config
                                            .getValue()
                                            .getConfigKey()
                                            .validator
                                            .toString()
                                            .substring(
                                                    1, config.getValue().getConfigKey().validator.toString().length() - 1)
                                            .split(", "))
                            .stream()
                            .map(s -> "target === '" + s + "'")
                            .collect(Collectors.joining(" || "));
            fw.write(String.format("\tvalidate: target => {\n"));
            fw.write(String.format("\t\tif(%s){ return true; }\n", predicate));
            fw.write(String.format("\t\treturn false;\n"));
            fw.write(String.format("\t},\n"));
        } else if (config.getValue().getConfigKey().validator instanceof ConfigDef.Range) {
            ConfigDef.Range range = (ConfigDef.Range) config.getValue().getConfigKey().validator;
            String newRange = range.toString().substring(1, range.toString().length() - 1);
            //
            Double min = null;
            Double max = null;
            String[] split = newRange.split(",");
            if (split.length == 2) {
                if ("...".equals(split[0])) {
                    max = Double.valueOf(split[1]);
                } else {
                    min = Double.valueOf(split[0]);
                }
            } else if (split.length == 3) {
                min = Double.valueOf(split[0]);
                max = Double.valueOf(split[2]);
            }

            fw.write(String.format("\tvalidate: target => { \n"));

            String condition = min != null ? "return target >= " + min : null;
            if (max != null) {
                condition =
                        condition != null ? condition + "&& target <= " + max : "return target >= " + max;
            }
            fw.write(String.format("\t\t%s \n", condition));

            fw.write(String.format("\t},\n"));
        } else {
            fw.write(String.format("\tvalidate: () => { return true; },\n"));
        }
    }

    private static void handleOptions(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        if (config.getValue().getConfigKey().validator instanceof EnumRecommender) {
            EnumRecommender recommender = (EnumRecommender) config.getValue().getConfigKey().validator;
            List<String> validStrings =
                    recommender.validValues(config.getKey(), null).stream().map(s -> "'" + s + "'").toList();

            fw.write(String.format("\toptions: [\n"));
            for (String validString : validStrings) {
                fw.write(String.format("\t\t{\n", validString));
                fw.write(String.format("\t\t\tlabel: %s,\n", validString));
                fw.write(String.format("\t\t\tvalue: %s,\n", validString));
                fw.write(String.format("\t\t},\n", validString));
            }
            fw.write(String.format("\t],\n"));

        } else if (config.getValue().getConfigKey().validator instanceof ConfigDef.ValidString) {
            List<String> validStrings =
                    List.of(
                            config
                                    .getValue()
                                    .getConfigKey()
                                    .validator
                                    .toString()
                                    .substring(1, config.getValue().getConfigKey().validator.toString().length() - 1)
                                    .split(", "));
            fw.write(String.format("\toptions: [\n"));
            for (String validString : validStrings) {
                fw.write(String.format("\t\t{\n", validString));
                fw.write(String.format("\t\t\tlabel: '%s',\n", validString));
                fw.write(String.format("\t\t\tvalue: '%s',\n", validString));
                fw.write(String.format("\t\t},\n", validString));
            }
            fw.write(String.format("\t],\n"));

        } else {
            fw.write(String.format("\toptions: undefined,\n"));
        }
    }

    private static void handleValidValues(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {

        ConfigDef.Validator validator = config.getValue().getConfigKey().validator;
        fw.write(
                String.format(
                        "\tvalidValues: %s,\n",
                        config.getValue().getConfigKey().validator != null
                                ? "'" + validator.toString() + "'"
                                : "undefined"));
    }

    private static void handleSelectable(FileWriter fw, Map.Entry<String, CustomConfigKey> config)
            throws IOException {
        if (config.getValue().getConfigKey().validator instanceof ConfigDef.ValidString
                || config.getValue().getConfigKey().validator instanceof EnumRecommender) {
            fw.write(String.format("\tisSelectable: true,\n"));
        } else {
            fw.write(String.format("\tisSelectable: false,\n"));
        }
    }

    private static void deleteDirectory(String path) throws IOException {
        Files.walk(Path.of(path))
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
    }
}
