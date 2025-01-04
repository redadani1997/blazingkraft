plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spring.management)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-ws"))
    implementation(project(":blazingkraft-admin"))
    implementation(project(":blazingkraft-producer"))
    implementation(project(":blazingkraft-consumer"))
    implementation(project(":blazingkraft-schemaregistry"))
    implementation(project(":blazingkraft-connect"))
    implementation(project(":blazingkraft-playground"))
    implementation(project(":blazingkraft-client"))
    implementation(project(":blazingkraft-dao"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-authserver"))
    implementation(project(":blazingkraft-resourceserver"))
    implementation(project(":blazingkraft-management"))
    implementation(project(":blazingkraft-settings"))
    implementation(project(":blazingkraft-files"))
    implementation(project(":blazingkraft-ksqldb"))
    implementation(libs.spring.slf4j2)
    implementation(libs.spring.web)
//    implementation(libs.spring.actuator)
    implementation(libs.spring.data)
    implementation(libs.apache.client.kafka)
    implementation(libs.confluent.client.schemaregistry)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)

    modules {
        module("org.springframework.boot:spring-boot-starter-logging") {
            replacedBy("org.springframework.boot:spring-boot-starter-log4j2", "Use Log4j2 instead of Logback")
        }
    }
}

spotless {
    java {
//		eclipseFormatFile 'googlestyle.xml'
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
    }
}