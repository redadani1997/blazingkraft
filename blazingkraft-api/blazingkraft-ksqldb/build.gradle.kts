import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
    alias(libs.plugins.openapi)
}

dependencies {
    implementation("org.apache.kafka:kafka-streams:3.4.0")
    implementation(libs.ksqldb.client)
    implementation(project(":blazingkraft-ws"))
    implementation(project(":blazingkraft-client"))
    implementation(project(":blazingkraft-dao"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-cleanup"))
    implementation(project(":blazingkraft-audit"))
    implementation(project(":blazingkraft-datamasking"))
    implementation(project(":blazingkraft-cache"))

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

tasks.create("openApiGenerateKsqlDbServer", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_server.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_server.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKsqlDbConnector", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_connector.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_connector.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKsqlDbQuery", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_query.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_query.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKsqlDbStream", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_stream.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_stream.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKsqlDbTable", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_table.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_table.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKsqlDbTopic", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_topic.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateKsqlDbEditor", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.ksqldb.ksqldb_editor.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/ksqldb/ksqldb_editor.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerateKsqlDbConnector")
    dependsOn("openApiGenerateKsqlDbQuery")
    dependsOn("openApiGenerateKsqlDbServer")
    dependsOn("openApiGenerateKsqlDbStream")
    dependsOn("openApiGenerateKsqlDbTable")
    dependsOn("openApiGenerateKsqlDbTopic")
    dependsOn("openApiGenerateKsqlDbEditor")
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