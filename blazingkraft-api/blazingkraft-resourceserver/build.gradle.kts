plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-authorization"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-cache"))
    implementation(libs.spring.resourceserver)
    implementation(libs.spring.core)
    implementation(libs.spring.web)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}
repositories {
    mavenCentral()
}

spotless {
    java {
//		eclipseFormatFile 'googlestyle.xml'
        googleJavaFormat()
        indentWithTabs(2)
        indentWithSpaces(4)
    }
}