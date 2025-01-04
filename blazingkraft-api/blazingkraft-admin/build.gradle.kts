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
    implementation(project(":blazingkraft-io"))

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

tasks.create("openApiGenerateExportImportCluster", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.export_import_cluster.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/export_import_cluster.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateAclBinding", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.acl_binding.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.acl_binding.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/acl_binding.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateTopic", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.topic.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.topic.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/topic.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateBroker", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.broker.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.broker.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/broker.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateCluster", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.cluster.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.cluster.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/cluster.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateConsumerGroup", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.consumer_group.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.consumer_group.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/consumer_group.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateOffset", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.offset.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.offset.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/offset.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateDelegationToken", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.delegation_token.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.delegation_token.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/delegation_token.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateQuota", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.admin.quota.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.admin.quota.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/admin/quota.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerateExportImportCluster")
    dependsOn("openApiGenerateAclBinding")
    dependsOn("openApiGenerateBroker")
    dependsOn("openApiGenerateCluster")
    dependsOn("openApiGenerateConsumerGroup")
    dependsOn("openApiGenerateOffset")
    dependsOn("openApiGenerateTopic")
    dependsOn("openApiGenerateDelegationToken")
    dependsOn("openApiGenerateQuota")
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