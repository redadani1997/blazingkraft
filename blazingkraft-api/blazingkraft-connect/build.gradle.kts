import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
    alias(libs.plugins.openapi)
}

dependencies {
    implementation(project(":blazingkraft-client"))
    implementation(project(":blazingkraft-dao"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-cleanup"))
    implementation(project(":blazingkraft-audit"))

    implementation(libs.bundles.openapi)

    implementation(libs.spring.web)
    implementation(libs.spring.data)
    implementation(libs.apache.client.kafka)
    implementation(libs.confluent.client.schemaregistry)
    implementation(libs.confluent.serializer.json)
    implementation(libs.confluent.serializer.jsonschema)
    implementation(libs.confluent.serializer.avro)
    implementation(libs.confluent.serializer.protobuf)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

tasks.create("openApiGeneratePlugin", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.connect.plugin.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.connect.plugin.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/connect/plugin.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateConnector", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.connect.connector.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.connect.connector.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/connect/connector.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateTask", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.connect.task.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.connect.task.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/connect/task.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKafkaConnectServer", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.connect.kafka_connect_server.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/connect/kafka_connect_server.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.withType<JavaCompile> {
    dependsOn("openApiGeneratePlugin")
    dependsOn("openApiGenerateConnector")
    dependsOn("openApiGenerateTask")
    dependsOn("openApiGenerateKafkaConnectServer")
}

spotless {
    java {
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
        targetExclude("build/*generated/**/*.java")
    }
}

sourceSets {
    main {
        java {
            srcDir("$buildDir/generated/src/main/java")
        }
    }
}