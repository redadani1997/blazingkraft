package com.redadani1997.blazingkraft.files.dto.in.files;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Data
public class FilesCreateRequest {
    private MultipartFile file;
}
