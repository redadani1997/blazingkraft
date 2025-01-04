package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import java.util.List;

public interface DataMaskingDao {

    Boolean existsByCode(String code);

    DataMaskingModel findByCode(String code);

    DataMaskingModel create(DataMaskingModel clusterModel);

    DataMaskingModel update(DataMaskingModel clusterModel);

    List<DataMaskingModel> findAll();

    void deleteById(Long id);
}
