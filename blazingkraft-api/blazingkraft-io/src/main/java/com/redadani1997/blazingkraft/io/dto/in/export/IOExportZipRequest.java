package com.redadani1997.blazingkraft.io.dto.in.export;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IOExportZipRequest {
    private String baseFileName;

    private List<IOExportZipJsonItemRequest> jsonItems;

    private List<IOExportZipFSItemRequest> fsItems;
}
