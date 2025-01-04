package com.redadani1997.blazingkraft.generator.utils;

public class DocumentationUtils {

    public static String getCommonDocumentation(String documentationUrl) {
        return String.format(
                "<Text className=\"pt-4\" size=\"xs\" color=\"dimmed\">\n"
                        + "                        Props to Apache Kafka® for this amazing documentation,{' '}\n"
                        + "                        <Anchor\n"
                        + "                            size=\"xs\"\n"
                        + "                            href={`%s`}\n"
                        + "                            target=\"_blank\"\n"
                        + "                        >\n"
                        + "                            learn more here\n"
                        + "                        </Anchor>\n"
                        + "                    </Text>",
                documentationUrl);
    }

    public static String getKafkaConnectorDocumentation(String documentationUrl) {
        return String.format(
                "<Text className=\"pt-4\" size=\"xs\" color=\"dimmed\">\n"
                        + "                        Props to Confluent, Inc for this amazing documentation,{' '}\n"
                        + "                        <Anchor\n"
                        + "                            size=\"xs\"\n"
                        + "                            href={`%s`}\n"
                        + "                            target=\"_blank\"\n"
                        + "                        >\n"
                        + "                            learn more here\n"
                        + "                        </Anchor>\n"
                        + "                    </Text>",
                documentationUrl);
    }

    public static String getSchemaRegistryDocumentation(String documentationUrl) {
        return String.format(
                "<Text className=\"pt-4\" size=\"xs\" color=\"dimmed\">\n"
                        + "                        Props to Confluent, Inc for this amazing documentation,{' '}\n"
                        + "                        <Anchor\n"
                        + "                            size=\"xs\"\n"
                        + "                            href={`%s`}\n"
                        + "                            target=\"_blank\"\n"
                        + "                        >\n"
                        + "                            learn more here\n"
                        + "                        </Anchor>\n"
                        + "                    </Text>",
                documentationUrl);
    }

    public static String getSerDeDocumentation() {
        return "<Text className=\"pt-4\" size=\"xs\" color=\"dimmed\">\n"
                + "                        Props to Confluent, Inc for this amazing documentation,{' '}\n"
                + "                        learn more by using their SerDes libraries."
                + "                    </Text>";
    }
}
