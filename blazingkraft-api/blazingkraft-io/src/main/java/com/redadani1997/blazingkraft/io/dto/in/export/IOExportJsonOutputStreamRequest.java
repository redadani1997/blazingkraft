package com.redadani1997.blazingkraft.io.dto.in.export;

import java.io.OutputStream;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IOExportJsonOutputStreamRequest {
    private OutputStream outputStream;

    private List<? extends Object> contents;
}
