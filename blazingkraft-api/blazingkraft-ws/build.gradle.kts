plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-resourceserver"))
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-common"))

    implementation(libs.spring.ws)
    implementation(libs.spring.resourceserver)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

spotless {
    java {
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
    }
}