package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.KsqlDbDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.KsqlDbRepository;
import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbServerException;
import java.util.List;
import java.util.Optional;

public class KsqlDbJdbcDao implements KsqlDbDao {
    private final KsqlDbRepository repository;

    public KsqlDbJdbcDao(KsqlDbRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public KsqlDbModel findByCode(String code) {
        Optional<KsqlDbModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new KsqlDbServerException(String.format("KsqlDb not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public KsqlDbModel create(KsqlDbModel model) {
        if (existsByCode(model.getCode())) {
            throw new KsqlDbServerException(
                    String.format("KsqlDb '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public KsqlDbModel update(KsqlDbModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<KsqlDbModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
