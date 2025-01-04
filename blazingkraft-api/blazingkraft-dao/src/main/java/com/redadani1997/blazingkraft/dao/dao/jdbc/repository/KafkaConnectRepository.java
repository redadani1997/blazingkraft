package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.KafkaConnectModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KafkaConnectRepository extends JpaRepository<KafkaConnectModel, Long> {

    boolean existsByCode(String code);

    Optional<KafkaConnectModel> findByCode(String code);
}
