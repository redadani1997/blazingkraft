plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-dao"))
    implementation(libs.nimbus.jose.jwt)
    implementation(libs.spring.core)
    implementation(libs.spring.web)

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