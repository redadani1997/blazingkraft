plugins {
    id("blazingkraft.library-conventions")
    alias(libs.plugins.spotless)
}

dependencies {
    implementation(project(":blazingkraft-common"))
    implementation(project(":blazingkraft-error"))

    implementation(libs.datasource.h2)
    implementation(libs.datasource.mysql)
    implementation(libs.datasource.postgresql)
    implementation(libs.datasource.mariadb)
    implementation(libs.datasource.sqlserver)

    implementation(libs.flyway)
    implementation(libs.flyway.mysql)
    implementation(libs.flyway.sqlserver)


    implementation(libs.spring.data)
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