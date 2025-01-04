package com.redadani1997.blazingkraft.files.service;

import com.redadani1997.blazingkraft.files.dto.in.files.FilesCreateRequest;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesDeleteRequest;
import com.redadani1997.blazingkraft.files.files.openapi.model.FilesApiResponse;
import java.util.List;

public interface FilesService {
    FilesApiResponse createFile(FilesCreateRequest request);

    void deleteFile(FilesDeleteRequest request);

    List<FilesApiResponse> getFiles();
}
