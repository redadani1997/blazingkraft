package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import java.util.List;

public interface ConsumerDao {

    Boolean existsByCode(String code);

    ConsumerModel findByCode(String code);

    ConsumerModel save(ConsumerModel consumerModel);

    List<ConsumerModel> findAll();

    void deleteById(Long id);
}
