package com.redadani1997.blazingkraft.error.common;

import java.util.List;
import lombok.Getter;

public class SchemaContentValidationException extends CommonException {
    @Getter private List<String> errorMessages;

    public SchemaContentValidationException(List<String> errorMessages) {
        super(String.format("Invalid content schema: %s", String.join(", ", errorMessages)));
        this.errorMessages = errorMessages;
    }

    public SchemaContentValidationException(String message) {
        super(message);
    }
}
