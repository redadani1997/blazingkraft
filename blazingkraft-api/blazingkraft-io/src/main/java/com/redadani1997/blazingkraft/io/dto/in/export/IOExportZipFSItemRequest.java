package com.redadani1997.blazingkraft.io.dto.in.export;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class IOExportZipFSItemRequest {
    private String fsPath;

    private String folderPath;
}
