import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
    alias(libs.plugins.openapi)
}

dependencies {
    implementation(project(":blazingkraft-dao"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-cache"))
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

tasks.create("openApiGenerateOIDCProvider", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.management.oidc_provider.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.management.oidc_provider.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/management/oidc_provider.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateGroup", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.management.group.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.management.group.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/management/group.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateUser", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.management.user.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.management.user.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/management/user.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateServerPermissions", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.management.server_permissions.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.management.server_permissions.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/management/server_permissions.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.create("openApiGenerateDataMasking", GenerateTask::class.java) {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.management.data_masking.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.management.data_masking.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/management/data_masking.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerateOIDCProvider")
    dependsOn("openApiGenerateGroup")
    dependsOn("openApiGenerateUser")
    dependsOn("openApiGenerateServerPermissions")
    dependsOn("openApiGenerateDataMasking")
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