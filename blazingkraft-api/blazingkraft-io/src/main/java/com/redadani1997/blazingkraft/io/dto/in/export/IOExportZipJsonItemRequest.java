package com.redadani1997.blazingkraft.io.dto.in.export;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class IOExportZipJsonItemRequest {
    private Object content;

    private String folderPath;

    private String fileName;
}
