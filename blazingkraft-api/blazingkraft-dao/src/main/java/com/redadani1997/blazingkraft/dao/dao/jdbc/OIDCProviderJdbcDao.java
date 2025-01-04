package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.OIDCProviderDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.OIDCProviderRepository;
import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import com.redadani1997.blazingkraft.error.connect.KafkaConnectServerException;
import java.util.List;
import java.util.Optional;

public class OIDCProviderJdbcDao implements OIDCProviderDao {
    private final OIDCProviderRepository repository;

    public OIDCProviderJdbcDao(OIDCProviderRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public OIDCProviderModel findByCode(String code) {
        Optional<OIDCProviderModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new KafkaConnectServerException(
                    String.format("OIDC Provider not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public OIDCProviderModel create(OIDCProviderModel model) {
        if (existsByCode(model.getCode())) {
            throw new KafkaConnectServerException(
                    String.format("OIDC Provider '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public OIDCProviderModel update(OIDCProviderModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<OIDCProviderModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
