package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.ConsumerDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.ConsumerRepository;
import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import java.util.List;
import java.util.Optional;

public class ConsumerJdbcDao implements ConsumerDao {
    private final ConsumerRepository repository;

    public ConsumerJdbcDao(ConsumerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public ConsumerModel findByCode(String code) {
        Optional<ConsumerModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new ConsumerException(String.format("Consumer not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public ConsumerModel save(ConsumerModel model) {
        //        if (this.existsByCode(model.getCode())) {
        //            throw new ClusterException(
        //                    String.format("Consumer '%s' already exists!", model.getCode()));
        //        }

        return this.repository.save(model);
    }

    @Override
    public List<ConsumerModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
