plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
    alias(libs.plugins.openapi)
}

dependencies {
    implementation(project(":blazingkraft-io"))
    implementation(project(":blazingkraft-client"))
    implementation(project(":blazingkraft-ws"))
    implementation(project(":blazingkraft-dao"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-cleanup"))
    implementation(project(":blazingkraft-audit"))
    implementation(project(":blazingkraft-cache"))
    implementation(project(":blazingkraft-datamasking"))

    implementation(libs.bundles.openapi)

    implementation(libs.spring.web)
    implementation(libs.spring.data)
    implementation(libs.apache.client.kafka)
    implementation(libs.confluent.client.schemaregistry)
    implementation(libs.confluent.serializer.json)
    implementation(libs.confluent.serializer.jsonschema)
    implementation(libs.confluent.serializer.avro)
    implementation(libs.confluent.serializer.protobuf)
    implementation(libs.graalvm.js)
    implementation(libs.graalvm.js.scriptengine)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

repositories {
    mavenCentral()
}

openApiGenerate {
    generatorName.set("spring")
    generateApiDocumentation.set(true)
    generateModelDocumentation.set(true)
    modelPackage.set("com.redadani1997.blazingkraft.consumer.openapi.model")
    apiPackage.set("com.redadani1997.blazingkraft.consumer.openapi.api")
    inputSpec.set("$rootDir/schemas/api/v1/consumer/consumer.openapi.yaml")
    outputDir.set("$buildDir/generated/")
    configFile.set("$rootDir/schemas/api/config.json")
}

tasks.withType<JavaCompile> {
    dependsOn("openApiGenerate")
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