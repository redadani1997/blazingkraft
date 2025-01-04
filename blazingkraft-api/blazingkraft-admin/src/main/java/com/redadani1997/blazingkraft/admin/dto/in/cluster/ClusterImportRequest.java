package com.redadani1997.blazingkraft.admin.dto.in.cluster;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ClusterImportRequest {
    private MultipartFile zipFile;
}
