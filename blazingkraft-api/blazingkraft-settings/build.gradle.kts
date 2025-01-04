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
    implementation(project(":blazingkraft-cache"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-cleanup"))

    implementation(libs.bundles.openapi)

    implementation(libs.spring.web)
    implementation(libs.spring.data)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

tasks.create("openApiGenerateConfiguration", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.settings.configuration.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.settings.configuration.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/settings/configuration.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.create("openApiGenerateProperties", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.settings.properties.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.settings.properties.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/settings/properties.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})



tasks.withType<JavaCompile> {
    dependsOn("openApiGenerateConfiguration")
    dependsOn("openApiGenerateProperties")
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