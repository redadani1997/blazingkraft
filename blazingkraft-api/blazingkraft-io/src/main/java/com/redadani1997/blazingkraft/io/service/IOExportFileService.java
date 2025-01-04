package com.redadani1997.blazingkraft.io.service;

import com.redadani1997.blazingkraft.io.dto.in.export.IOExportCsvOutputStreamRequest;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportJsonOutputStreamRequest;
import com.redadani1997.blazingkraft.io.dto.in.export.IOExportZipRequest;
import com.redadani1997.blazingkraft.io.dto.out.export.IOExportZipResponse;

public interface IOExportFileService {

    IOExportZipResponse exportZipFile(IOExportZipRequest request);

    void exportJsonFileOutputStream(IOExportJsonOutputStreamRequest request);

    void exportCsvFileOutputStream(IOExportCsvOutputStreamRequest request);
}
