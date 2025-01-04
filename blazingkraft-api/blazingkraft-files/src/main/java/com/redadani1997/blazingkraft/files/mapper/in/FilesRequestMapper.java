package com.redadani1997.blazingkraft.files.mapper.in;

import com.redadani1997.blazingkraft.audit.service.AuditLogService;
import com.redadani1997.blazingkraft.common.validator.CommonValidator;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesCreateRequest;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesDeleteRequest;
import com.redadani1997.blazingkraft.files.files.openapi.model.FilesDeleteApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class FilesRequestMapper {
    private final AuditLogService auditLogService;

    public FilesCreateRequest filesCreateRequest(MultipartFile file) {
        this.auditLogService.setSubject(file.getOriginalFilename());

        FilesCreateRequest request = new FilesCreateRequest();

        request.setFile(file);

        return request;
    }

    public FilesDeleteRequest filesDeleteRequest(FilesDeleteApiRequest apiRequest) {
        this.auditLogService.setSubject(apiRequest.getFilePath());

        CommonValidator.assertNotBlank("filePath", apiRequest.getFilePath());

        FilesDeleteRequest request = new FilesDeleteRequest();

        request.setFilePath(apiRequest.getFilePath());

        return request;
    }
}
