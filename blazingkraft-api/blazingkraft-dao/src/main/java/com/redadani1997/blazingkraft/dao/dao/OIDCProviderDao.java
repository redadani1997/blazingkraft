package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import java.util.List;

public interface OIDCProviderDao {

    Boolean existsByCode(String code);

    OIDCProviderModel findByCode(String code);

    OIDCProviderModel create(OIDCProviderModel model);

    OIDCProviderModel update(OIDCProviderModel model);

    List<OIDCProviderModel> findAll();

    void deleteById(Long id);
}
