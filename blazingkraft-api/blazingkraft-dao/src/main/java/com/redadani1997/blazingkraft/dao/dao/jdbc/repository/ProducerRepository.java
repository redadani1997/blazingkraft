package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerRepository extends JpaRepository<ProducerModel, Long> {

    boolean existsByCode(String code);

    Optional<ProducerModel> findByCode(String code);
}
