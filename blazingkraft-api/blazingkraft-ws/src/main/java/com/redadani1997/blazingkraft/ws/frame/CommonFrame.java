package com.redadani1997.blazingkraft.ws.frame;

import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import lombok.Data;

@Data
public class CommonFrame {
    private CommonFrameType type;
    private String payload;

    public CommonFrame(CommonFrameType type, Object payload) {
        this.type = type;
        if (payload instanceof String) {
            this.payload = (String) payload;
        } else {
            this.payload = CommonCastingUtils.toJsonString(payload);
        }
    }
}
