plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spring.management)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-common"))
    implementation(libs.spring.web)
    implementation(libs.apache.commons.text)
    implementation(libs.apache.client.kafka)
    implementation(libs.confluent.client.schemaregistry)
    implementation(libs.confluent.serializer.json)
    implementation(libs.confluent.serializer.jsonschema)
    implementation(libs.confluent.serializer.avro)
    implementation(libs.confluent.serializer.protobuf)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

spotless {
    java {
//		eclipseFormatFile 'googlestyle.xml'
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
    }
}

springBoot {
    mainClass.set("com.blazingistruments.blazingkraft.generator.GeneratorApplication")
}