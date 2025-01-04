package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.DataMaskingDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.DataMaskingRepository;
import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import com.redadani1997.blazingkraft.error.management.DataMaskingException;
import java.util.List;
import java.util.Optional;

public class DataMaskingJdbcDao implements DataMaskingDao {
    private final DataMaskingRepository repository;

    public DataMaskingJdbcDao(DataMaskingRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public DataMaskingModel findByCode(String code) {
        Optional<DataMaskingModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new DataMaskingException(String.format("Data Masking not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public DataMaskingModel create(DataMaskingModel model) {
        if (existsByCode(model.getCode())) {
            throw new DataMaskingException(
                    String.format("Data Masking '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public DataMaskingModel update(DataMaskingModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<DataMaskingModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
