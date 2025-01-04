package com.redadani1997.blazingkraft.management.dto.in.data_masking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataMaskingDeleteRequest {
    private String code;
}
