package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import java.util.List;

public interface ProducerDao {

    Boolean existsByCode(String code);

    ProducerModel findByCode(String code);

    ProducerModel save(ProducerModel producerModel);

    List<ProducerModel> findAll();

    void deleteById(Long id);
}
