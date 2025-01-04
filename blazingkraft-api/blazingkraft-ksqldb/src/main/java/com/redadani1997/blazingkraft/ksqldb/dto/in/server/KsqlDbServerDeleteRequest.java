package com.redadani1997.blazingkraft.ksqldb.dto.in.server;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KsqlDbServerDeleteRequest {

    private String code;
}
