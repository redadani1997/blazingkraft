package com.redadani1997.blazingkraft.common.application_event;

import lombok.Data;

@Data
public class KsqlDbEditedApplicationEvent {
    private final String ksqlDbCode;
}
