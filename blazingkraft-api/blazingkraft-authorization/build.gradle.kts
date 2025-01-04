plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-client"))
    implementation(project(":blazingkraft-cache"))
    implementation(libs.spring.aop)
    implementation(libs.spring.core)
    implementation(libs.spring.security)
    implementation(libs.spring.resourceserver)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

spotless {
    java {
//		eclipseFormatFile 'googlestyle.xml'
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
    }
}