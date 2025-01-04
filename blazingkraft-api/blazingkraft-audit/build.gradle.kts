import org.openapitools.generator.gradle.plugin.tasks.GenerateTask

plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
    alias(libs.plugins.openapi)
}

dependencies {
    implementation(project(":blazingkraft-client"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-cleanup"))
    implementation(project(":blazingkraft-dao"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))

    implementation(libs.bundles.openapi)

    implementation(libs.spring.web)
    implementation(libs.spring.data)
    implementation(libs.spring.aop)
    implementation(libs.spring.core)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

repositories {
    mavenCentral()
}

tasks.create("openApiGenerateAuditSearch", GenerateTask::class.java, {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.audit.audit_search.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.audit.audit_search.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/audit/audit_search.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
})

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerateAuditSearch")
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