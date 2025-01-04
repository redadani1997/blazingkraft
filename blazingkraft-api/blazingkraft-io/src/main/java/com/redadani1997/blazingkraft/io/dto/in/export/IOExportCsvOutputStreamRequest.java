package com.redadani1997.blazingkraft.io.dto.in.export;

import java.io.OutputStream;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IOExportCsvOutputStreamRequest {
    private OutputStream outputStream;

    private List<String> headers;

    private List<List<? extends Object>> contents;
}
