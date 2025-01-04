
plugins {
    id("blazingkraft.application-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(libs.spring.web)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

spotless {
    java {
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
        targetExclude("build/*generated/**/*.java")
    }
}
