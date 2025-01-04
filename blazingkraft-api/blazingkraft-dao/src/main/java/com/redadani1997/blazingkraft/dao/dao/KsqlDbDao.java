package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import java.util.List;

public interface KsqlDbDao {

    Boolean existsByCode(String code);

    KsqlDbModel findByCode(String code);

    KsqlDbModel create(KsqlDbModel kafkaConnectModel);

    KsqlDbModel update(KsqlDbModel kafkaConnectModel);

    List<KsqlDbModel> findAll();

    void deleteById(Long id);
}
