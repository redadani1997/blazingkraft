package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.SchemaRegistryModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchemaRegistryRepository extends JpaRepository<SchemaRegistryModel, Long> {

    boolean existsByCode(String code);

    Optional<SchemaRegistryModel> findByCode(String code);
}
