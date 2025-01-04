package com.redadani1997.blazingkraft.files.mapper.out;

import com.redadani1997.blazingkraft.files.files.openapi.model.FilesApiResponse;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class FilesResponseMapper {
    public List<FilesApiResponse> filesApiResponses(List<String> targetPaths) {
        if (targetPaths == null) {
            return Collections.emptyList();
        }
        return targetPaths.stream().map(this::filesApiResponse).toList();
    }

    public FilesApiResponse filesApiResponse(String targetPath) {
        FilesApiResponse response = new FilesApiResponse();

        response.setPath(targetPath);

        return response;
    }
}
