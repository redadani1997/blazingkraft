plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))
    implementation(project(":blazingkraft-dao"))
    implementation(libs.spring.core)
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