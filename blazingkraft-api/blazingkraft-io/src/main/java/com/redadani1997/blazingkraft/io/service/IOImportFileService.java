package com.redadani1997.blazingkraft.io.service;

import org.springframework.web.multipart.MultipartFile;

public interface IOImportFileService {

    String importZipFile(MultipartFile file);
}
