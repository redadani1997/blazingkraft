plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-error"))

    implementation(libs.spring.core)
    implementation(libs.spring.security)
    implementation(libs.spring.web)
    implementation(libs.apache.client.kafka)
    implementation(libs.confluent.client.schemaregistry)
    implementation(libs.confluent.serializer.json)
    implementation(libs.confluent.serializer.jsonschema)
    implementation(libs.confluent.serializer.avro)
    implementation(libs.confluent.serializer.protobuf)
    implementation(libs.apache.commons.text)
    implementation(libs.apache.commons.lang)
    implementation(libs.apache.commons.collections)
    implementation(libs.apache.commons.io)
    implementation(libs.openapi.schema.validator)
    api(libs.jackson.databind)

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