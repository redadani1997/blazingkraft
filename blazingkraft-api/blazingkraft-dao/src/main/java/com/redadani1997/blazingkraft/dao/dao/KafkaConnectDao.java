package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import java.util.List;

public interface KafkaConnectDao {

    Boolean existsByCode(String code);

    KafkaConnectModel findByCode(String code);

    KafkaConnectModel create(KafkaConnectModel kafkaConnectModel);

    KafkaConnectModel update(KafkaConnectModel kafkaConnectModel);

    List<KafkaConnectModel> findAll();

    void deleteById(Long id);
}
