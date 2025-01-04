package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.ProducerDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.ProducerRepository;
import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import com.redadani1997.blazingkraft.error.admin.ProducerException;
import java.util.List;
import java.util.Optional;

public class ProducerJdbcDao implements ProducerDao {
    private final ProducerRepository repository;

    public ProducerJdbcDao(ProducerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public ProducerModel findByCode(String code) {
        Optional<ProducerModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new ProducerException(String.format("Producer not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public ProducerModel save(ProducerModel model) {
        //        if (this.existsByCode(model.getCode())) {
        //            throw new ClusterException(
        //                    String.format("Producer '%s' already exists!", model.getCode()));
        //        }

        return this.repository.save(model);
    }

    @Override
    public List<ProducerModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
