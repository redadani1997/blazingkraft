package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import java.util.List;

public interface ClusterDao {

    Boolean existsByCode(String code);

    ClusterModel findByCode(String code);

    ClusterModel create(ClusterModel clusterModel);

    ClusterModel update(ClusterModel clusterModel);

    List<ClusterModel> findAll();

    void deleteById(Long id);
}
