package com.redadani1997.blazingkraft.io.service.impl;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.redadani1997.blazingkraft.common.constant.CommonFileConstants;
import com.redadani1997.blazingkraft.common.model.CommonObjectMapper;
import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.util.CommonFileUtils;
import com.redadani1997.blazingkraft.common.util.CommonReflectionUtils;
import com.redadani1997.blazingkraft.common.util.CommonZipUtils;
import com.redadani1997.blazingkraft.error.io.IOExportException;
import com.redadani1997.blazingkraft.io.dto.in.export.*;
import com.redadani1997.blazingkraft.io.dto.out.export.IOExportZipResponse;
import com.redadani1997.blazingkraft.io.service.IOExportFileService;
import com.redadani1997.blazingkraft.io.utils.CommonFileNameGenerator;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class IOExportFileServiceImpl implements IOExportFileService {

    @Override
    public void exportJsonFileOutputStream(IOExportJsonOutputStreamRequest request) {
        JsonGenerator jsonGenerator = null;

        try {
            jsonGenerator =
                    CommonObjectMapper.OBJECT_MAPPER.getFactory().createGenerator(request.getOutputStream());

            jsonGenerator.setPrettyPrinter(new DefaultPrettyPrinter());

            jsonGenerator.writeStartArray();

            for (Object content : request.getContents()) {
                jsonGenerator.writeObject(content);
            }
            jsonGenerator.writeEndArray();

        } catch (Exception ex) {
            throw new IOExportException(
                    String.format("Error while generating json file: %s", ex.getMessage()));
        } finally {
            if (jsonGenerator != null) {
                try {
                    jsonGenerator.close();
                } catch (IOException ex) {
                    // no-op
                }
            }
        }
    }

    @Override
    public void exportCsvFileOutputStream(IOExportCsvOutputStreamRequest request) {
        try (PrintWriter pw = new PrintWriter(request.getOutputStream())) {
            String headers = this.generateCsvLine(request.getHeaders());
            pw.println(headers);

            for (List<? extends Object> content : request.getContents()) {
                String line = this.generateCsvLine(content);
                pw.println(line);
            }
        }
    }

    @Override
    public IOExportZipResponse exportZipFile(IOExportZipRequest request) {
        String tmpFolderPath = null;
        try {
            String exportedFileName = CommonFileNameGenerator.generateFileName(request.getBaseFileName());

            tmpFolderPath =
                    CommonFileUtils.joinPaths(
                            CommonFileConstants.BLAZINGKRAFT_TMP_EXPORT_FOLDER_PATH, exportedFileName);

            for (IOExportZipJsonItemRequest item : request.getJsonItems()) {
                this.exportZipJsonFileItem(item, tmpFolderPath);
            }
            for (IOExportZipFSItemRequest item : request.getFsItems()) {
                this.exportZipFSFileItem(item, tmpFolderPath);
            }

            CommonZipUtils.zipFolder(tmpFolderPath, tmpFolderPath + ".zip");

            byte[] bytes = CommonFileUtils.fileToBytes(tmpFolderPath + ".zip");

            return IOExportZipResponse.builder().fileName(exportedFileName + ".zip").bytes(bytes).build();
        } catch (Exception ex) {
            throw new IOExportException(ex);
        } finally {
            if (tmpFolderPath != null) {
                CommonFileUtils.silentDeleteDirectory(tmpFolderPath);
                CommonFileUtils.silentDeleteFile(tmpFolderPath + ".zip");
            }
        }
    }

    private void exportZipJsonFileItem(IOExportZipJsonItemRequest item, String tmpFolderPath) {
        String folderPath = CommonFileUtils.joinPaths(tmpFolderPath, item.getFolderPath());

        TypeReference<Map<String, Object>> typeRef = new TypeReference<>() {};
        Map<String, Object> content =
                CommonCastingUtils.castWithTypeReference(item.getContent(), typeRef);

        try {
            CommonFileUtils.writeJsonFile(folderPath, item.getFileName(), content);
        } catch (IOException ex) {
            throw new IOExportException(ex);
        }
    }

    private void exportZipFSFileItem(IOExportZipFSItemRequest item, String tmpFolderPath) {
        String fileName = CommonFileUtils.computeFileName(item.getFsPath());

        String folderPath = CommonFileUtils.joinPaths(tmpFolderPath, item.getFolderPath());

        CommonFileUtils.silentCopyFile(
                item.getFsPath(), CommonFileUtils.joinPaths(folderPath, fileName));
    }

    private String generateCsvLine(List<? extends Object> content) {
        return content.stream()
                .map(
                        data -> {
                            String stringifiedData;
                            if (CommonReflectionUtils.isPrimitive(data)) {
                                stringifiedData = data.toString();
                            } else {
                                stringifiedData = CommonCastingUtils.toJsonString(data);
                            }
                            return this.escapeSpecialCharacters(stringifiedData);
                        })
                .collect(Collectors.joining(","));
    }

    public String escapeSpecialCharacters(String data) {
        if (data == null) {
            return null;
        }

        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }
}
