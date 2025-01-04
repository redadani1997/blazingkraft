package com.redadani1997.blazingkraft.common.util;

import com.redadani1997.blazingkraft.common.model.CommonObjectMapper;
import java.io.*;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;

@UtilityClass
@Slf4j
public class CommonFileUtils {
    public static void silentCopyFile(String filePath, String targetFile) {
        try {
            File file = new File(filePath);
            if (file.exists()) {
                FileUtils.copyFile(file, new File(targetFile));
            }
        } catch (Exception ex) {
            // no-op
        }
    }

    public static byte[] fileToBytes(String filePath) throws IOException {
        File file = new File(filePath);
        return FileUtils.readFileToByteArray(file);
    }

    public static void bytesToFile(byte[] bytes, String filePath) throws IOException {
        File file = new File(filePath);

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(bytes);
        }
    }

    public static String joinPaths(String first, String... more) {
        return Path.of(first, more).toString();
    }

    public static String computeFileName(String fullPath) {
        try {
            if (fullPath == null) {
                return null;
            }
            Path fileName = Path.of(fullPath).getFileName();
            if (fileName == null) {
                return null;
            }
            return fileName.toString();
        } catch (Exception ex) {
            log.error(
                    CommonLogUtils.getError(
                            String.format(
                                    "Error while computing file name for '%s' and error is => '%s'",
                                    fullPath, ex.getMessage())));
            return fullPath;
        }
    }

    public static Boolean fileExists(String path) {
        File file = new File(path);
        return file.exists();
    }

    public static void createDirIfNotExists(String dirPath) {
        File dir = new File(dirPath);

        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public static void copyInputStreamToFile(InputStream inputStream, String targetFilePath)
            throws IOException {
        File targetFile = new File(targetFilePath);

        FileUtils.copyInputStreamToFile(inputStream, targetFile);
    }

    public static List<String> listFilePaths(String dirPath) {
        File dir = new File(dirPath);

        if (!dir.exists()) {
            dir.mkdirs();
            return Collections.emptyList();
        }
        File[] files = dir.listFiles();
        if (files == null) {
            return Collections.emptyList();
        }
        List<String> filePaths = new ArrayList<>();
        for (File file : files) {
            filePaths.add(file.getAbsolutePath());
        }
        return filePaths;
    }

    public static List<File> listFiles(String dirPath) {
        File dir = new File(dirPath);

        if (!dir.exists()) {
            return Collections.emptyList();
        }
        File[] files = dir.listFiles();
        if (files == null) {
            return Collections.emptyList();
        }
        return List.of(files);
    }

    public static void writeJsonFile(String dirPath, String fileName, Object content)
            throws IOException {
        File dir = new File(dirPath);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        Map contentMap = CommonObjectMapper.OBJECT_MAPPER.convertValue(content, Map.class);

        File file = new File(joinPaths(dirPath, fileName));

        CommonObjectMapper.OBJECT_MAPPER.writerWithDefaultPrettyPrinter().writeValue(file, contentMap);
    }

    public static <T> T jsonFileToObject(String filePath, Class<T> clazz) throws IOException {
        InputStream inJson = new FileInputStream(filePath);
        return CommonObjectMapper.OBJECT_MAPPER.readValue(inJson, clazz);
    }

    public static void deleteFile(String filePath) throws IOException {
        File file = new File(filePath);
        FileUtils.delete(file);
    }

    public static void silentDeleteFile(String filePath) {
        try {
            File file = new File(filePath);
            FileUtils.forceDelete(file);
        } catch (Exception ex) {
            // do nothing
        }
    }

    public static void silentDeleteDirectory(String filePath) {
        try {
            File file = new File(filePath);
            FileUtils.deleteDirectory(file);
        } catch (Exception ex) {
            // do nothing
        }
    }

    public static final String SYSTEM_FILE_SEPARATOR = "/";
}
