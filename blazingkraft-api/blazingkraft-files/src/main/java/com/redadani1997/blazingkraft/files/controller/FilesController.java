package com.redadani1997.blazingkraft.files.controller;

import com.redadani1997.blazingkraft.audit.decorator.WithAudit;
import com.redadani1997.blazingkraft.audit.enums.AuditSeverity;
import com.redadani1997.blazingkraft.authorization.decorator.WithAuthorization;
import com.redadani1997.blazingkraft.cleanup.decorator.WithCleanUp;
import com.redadani1997.blazingkraft.common.actions.management.FilesActions;
import com.redadani1997.blazingkraft.common.enums.EntityType;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesCreateRequest;
import com.redadani1997.blazingkraft.files.dto.in.files.FilesDeleteRequest;
import com.redadani1997.blazingkraft.files.files.openapi.api.FilesApi;
import com.redadani1997.blazingkraft.files.files.openapi.model.FilesApiResponse;
import com.redadani1997.blazingkraft.files.files.openapi.model.FilesDeleteApiRequest;
import com.redadani1997.blazingkraft.files.mapper.in.FilesRequestMapper;
import com.redadani1997.blazingkraft.files.service.FilesService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
public class FilesController implements FilesApi {
    private final FilesService filesService;
    private final FilesRequestMapper requestMapper;

    @WithCleanUp
    @WithAudit(
            action = FilesActions.CREATE_FILE,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(permission = FilesActions.CREATE_FILE, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<FilesApiResponse> createFile(MultipartFile file) {
        FilesCreateRequest request = this.requestMapper.filesCreateRequest(file);

        FilesApiResponse response = this.filesService.createFile(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @WithCleanUp
    @WithAudit(
            action = FilesActions.DELETE_FILE,
            type = EntityType.MANAGEMENT,
            severity = AuditSeverity.HIGH)
    @WithAuthorization(permission = FilesActions.DELETE_FILE, type = EntityType.MANAGEMENT)
    @Override
    public ResponseEntity<Void> deleteFile(FilesDeleteApiRequest apiRequest) {
        FilesDeleteRequest request = this.requestMapper.filesDeleteRequest(apiRequest);

        this.filesService.deleteFile(request);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Override
    public ResponseEntity<List<FilesApiResponse>> getFiles() {
        List<FilesApiResponse> response = this.filesService.getFiles();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
