package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.ClusterRepository;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import com.redadani1997.blazingkraft.error.admin.ClusterException;
import java.util.List;
import java.util.Optional;

public class ClusterJdbcDao implements ClusterDao {
    private final ClusterRepository repository;

    public ClusterJdbcDao(ClusterRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public ClusterModel findByCode(String code) {
        Optional<ClusterModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new ClusterException(String.format("Cluster not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public ClusterModel create(ClusterModel model) {
        if (existsByCode(model.getCode())) {
            throw new ClusterException(String.format("Cluster '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public ClusterModel update(ClusterModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<ClusterModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
