package com.redadani1997.blazingkraft.error.common;

import java.util.List;
import lombok.Getter;

public class SchemaParseException extends CommonException {
    @Getter private List<String> errorMessages;

    public SchemaParseException(List<String> errorMessages) {
        super(String.format("Invalid schema definition: %s", String.join(", ", errorMessages)));
        this.errorMessages = errorMessages;
    }

    public SchemaParseException(String message) {
        super(message);
    }
}
