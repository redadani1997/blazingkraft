package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.KsqlDbModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KsqlDbRepository extends JpaRepository<KsqlDbModel, Long> {

    boolean existsByCode(String code);

    Optional<KsqlDbModel> findByCode(String code);
}
