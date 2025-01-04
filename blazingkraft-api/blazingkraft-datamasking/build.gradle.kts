plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-cache"))

    implementation(libs.spring.web)
    implementation(libs.spring.core)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

repositories {
    mavenCentral()
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