package com.redadani1997.blazingkraft.files.service.impl;

import com.redadani1997.blazingkraft.common.constant.CommonFileConstants;
import com.redadani1997.blazingkraft.common.util.CommonFileUtils;
import com.redadani1997.blazingkraft.error.files.FilesException;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesCreateRequest;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesDeleteRequest;
import com.redadani1997.blazingkraft.files.files.openapi.model.FilesApiResponse;
import com.redadani1997.blazingkraft.files.mapper.out.FilesResponseMapper;
import com.redadani1997.blazingkraft.files.service.FilesService;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FilesServiceImpl implements FilesService {
    private final FilesResponseMapper responseMapper;

    @Override
    public FilesApiResponse createFile(FilesCreateRequest request) {
        try {
            MultipartFile file = request.getFile();

            String fileName = file.getOriginalFilename();
            String targetPath =
                    CommonFileUtils.joinPaths(CommonFileConstants.BLAZINGKRAFT_FILES_FOLDER_PATH, fileName);

            String targetPathAbsolute =
                    Path.of(CommonFileConstants.BLAZINGKRAFT_FILES_FOLDER_PATH, fileName)
                            .toAbsolutePath()
                            .toString();

            boolean filePathExists =
                    this.getFiles().stream()
                            .anyMatch(filesApiResponse -> targetPathAbsolute.equals(filesApiResponse.getPath()));

            if (filePathExists) {
                throw new FilesException(
                        String.format("File with path '%s' already exists.", targetPathAbsolute));
            }

            CommonFileUtils.createDirIfNotExists(CommonFileConstants.BLAZINGKRAFT_FILES_FOLDER_PATH);

            InputStream inputStream = file.getInputStream();

            CommonFileUtils.copyInputStreamToFile(inputStream, targetPath);

            return this.responseMapper.filesApiResponse(targetPath);
        } catch (Exception ex) {
            throw new FilesException(ex);
        }
    }

    @Override
    public void deleteFile(FilesDeleteRequest request) {
        try {
            String filePath = request.getFilePath();

            String blazingKRaftFilesFolderPath =
                    Path.of(CommonFileConstants.BLAZINGKRAFT_FILES_FOLDER_PATH).toAbsolutePath().toString();
            if (!filePath.startsWith(blazingKRaftFilesFolderPath)) {
                throw new FilesException(
                        String.format(
                                "File with path '%s' to delete should start with '%s'.",
                                filePath, blazingKRaftFilesFolderPath));
            }

            boolean filePathExists =
                    this.getFiles().stream()
                            .anyMatch(filesApiResponse -> filePath.equals(filesApiResponse.getPath()));

            if (!filePathExists) {
                throw new FilesException(String.format("File with path '%s' does not exist.", filePath));
            }

            CommonFileUtils.deleteFile(filePath);
        } catch (Exception ex) {
            throw new FilesException(ex);
        }
    }

    @Override
    public List<FilesApiResponse> getFiles() {
        List<String> filePaths =
                CommonFileUtils.listFilePaths(CommonFileConstants.BLAZINGKRAFT_FILES_FOLDER_PATH);
        return this.responseMapper.filesApiResponses(filePaths);
    }
}
