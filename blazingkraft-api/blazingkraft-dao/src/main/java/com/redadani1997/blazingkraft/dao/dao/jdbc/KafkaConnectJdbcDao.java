package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.KafkaConnectDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.KafkaConnectRepository;
import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import com.redadani1997.blazingkraft.error.connect.KafkaConnectServerException;
import java.util.List;
import java.util.Optional;

public class KafkaConnectJdbcDao implements KafkaConnectDao {
    private final KafkaConnectRepository repository;

    public KafkaConnectJdbcDao(KafkaConnectRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public KafkaConnectModel findByCode(String code) {
        Optional<KafkaConnectModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new KafkaConnectServerException(
                    String.format("Kafka Connect not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public KafkaConnectModel create(KafkaConnectModel model) {
        if (existsByCode(model.getCode())) {
            throw new KafkaConnectServerException(
                    String.format("Kafka Connect '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public KafkaConnectModel update(KafkaConnectModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<KafkaConnectModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
