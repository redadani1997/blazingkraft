package com.redadani1997.blazingkraft.io.service.impl;

import com.redadani1997.blazingkraft.common.constant.CommonFileConstants;
import com.redadani1997.blazingkraft.common.util.CommonFileUtils;
import com.redadani1997.blazingkraft.common.util.CommonZipUtils;
import com.redadani1997.blazingkraft.error.io.IOImportException;
import com.redadani1997.blazingkraft.io.utils.CommonFileNameGenerator;
import java.io.Closeable;
import java.io.File;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public class IOImportZipFileServiceImpl implements Closeable {

    private final String tmpZipPath;

    private final String tmpFolderPath;

    public IOImportZipFileServiceImpl(MultipartFile zipFile) throws IOImportException {
        try {
            String fileName =
                    zipFile.getOriginalFilename() == null
                            ? CommonFileNameGenerator.generatePrefixedFileName("tmp_zip_file")
                            : CommonFileNameGenerator.stripExtension(
                                    CommonFileNameGenerator.generatePrefixedFileName(zipFile.getOriginalFilename()));

            CommonFileUtils.createDirIfNotExists(CommonFileConstants.BLAZINGKRAFT_TMP_IMPORT_FOLDER_PATH);

            String computedFilePath =
                    CommonFileUtils.joinPaths(
                            CommonFileConstants.BLAZINGKRAFT_TMP_IMPORT_FOLDER_PATH, fileName);

            this.tmpZipPath = computedFilePath + ".zip";

            CommonFileUtils.bytesToFile(zipFile.getBytes(), this.tmpZipPath);

            this.tmpFolderPath = computedFilePath;

            CommonZipUtils.unzipFile(this.tmpZipPath, this.tmpFolderPath);
        } catch (Exception ex) {
            throw new IOImportException(
                    String.format(
                            "Error when trying to unzip imported file with Error => '%s'", ex.getMessage()));
        }
    }

    public String copyFile(String fileFolderPath) {
        String tmpFileFolderPath = CommonFileUtils.joinPaths(this.tmpFolderPath, fileFolderPath);
        List<File> files = CommonFileUtils.listFiles(tmpFileFolderPath);
        if (files.isEmpty()) {
            return null;
        }
        if (files.size() > 1) {
            throw new IOImportException(
                    String.format(
                            "Found '%s' files in folder '%s' when trying to copy file!",
                            files.size(), tmpFileFolderPath));
        }
        File file = files.get(0);
        String filePath =
                CommonFileUtils.joinPaths(
                        CommonFileConstants.BLAZINGKRAFT_FILES_FOLDER_PATH, file.getName());
        CommonFileUtils.silentCopyFile(file.getAbsolutePath(), filePath);
        return filePath;
    }

    public <T> T getJsonFile(String jsonFilePath, Class<T> clazz) {
        String fullPath = CommonFileUtils.joinPaths(this.tmpFolderPath, jsonFilePath);
        try {
            return CommonFileUtils.jsonFileToObject(fullPath, clazz);
        } catch (Exception ex) {
            throw new IOImportException(
                    String.format(
                            "Error when trying convert file => '%s' with Error => '%s'",
                            jsonFilePath, ex.getMessage()));
        }
    }

    @Override
    public void close() {
        CommonFileUtils.silentDeleteFile(this.tmpZipPath);
        CommonFileUtils.silentDeleteFile(this.tmpFolderPath);
    }
}
