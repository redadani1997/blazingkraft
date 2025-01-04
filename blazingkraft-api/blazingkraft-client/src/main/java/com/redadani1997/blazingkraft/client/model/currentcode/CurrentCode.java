package com.redadani1997.blazingkraft.client.model.currentcode;

import com.redadani1997.blazingkraft.common.enums.EntityType;
import lombok.Data;

@Data
public class CurrentCode {
    private final String code;

    private final EntityType type;
}
