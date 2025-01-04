package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import java.util.List;

public interface SchemaRegistryDao {

    Boolean existsByCode(String schemaRegistryCode);

    SchemaRegistryModel findByCode(String schemaRegistryCode);

    SchemaRegistryModel create(SchemaRegistryModel schemaRegistryModel);

    SchemaRegistryModel update(SchemaRegistryModel schemaRegistryModel);

    void deleteById(Long id);

    List<SchemaRegistryModel> findAll();
}
