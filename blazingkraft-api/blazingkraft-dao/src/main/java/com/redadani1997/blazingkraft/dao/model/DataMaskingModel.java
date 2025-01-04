package com.redadani1997.blazingkraft.dao.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "data_masking_rules")
@Getter
@Setter
@NoArgsConstructor
public class DataMaskingModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;

    private String name;

    private String code;

    private String dataMaskingType;

    @Column(name = "blazing_rule")
    private String rule;

    private String ruleType;

    private String result;

    private String topicType;

    private String topic;
}
