package com.redadani1997.blazingkraft.io.dto.out.export;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IOExportJsonOutputStreamResponse {
    private String fileName;
}
