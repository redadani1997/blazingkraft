package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.SchemaRegistryRepository;
import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import com.redadani1997.blazingkraft.error.schemaregistry.SchemaRegistryException;
import java.util.List;
import java.util.Optional;

public class SchemaRegistryJdbcDao implements SchemaRegistryDao {

    private final SchemaRegistryRepository repository;

    public SchemaRegistryJdbcDao(SchemaRegistryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String schemaRegistryCode) {
        return this.repository.existsByCode(schemaRegistryCode);
    }

    @Override
    public SchemaRegistryModel findByCode(String schemaRegistryCode) {
        Optional<SchemaRegistryModel> modelOptional = this.repository.findByCode(schemaRegistryCode);
        if (modelOptional.isEmpty()) {
            throw new SchemaRegistryException(
                    String.format("Schema Registry not found for code '%s'", schemaRegistryCode));
        }
        return modelOptional.get();
    }

    @Override
    public SchemaRegistryModel update(SchemaRegistryModel schemaRegistryModel) {
        return this.repository.save(schemaRegistryModel);
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }

    @Override
    public SchemaRegistryModel create(SchemaRegistryModel model) {
        if (existsByCode(model.getCode())) {
            throw new SchemaRegistryException(
                    String.format("Schema Registry '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public List<SchemaRegistryModel> findAll() {
        return this.repository.findAll();
    }
}
