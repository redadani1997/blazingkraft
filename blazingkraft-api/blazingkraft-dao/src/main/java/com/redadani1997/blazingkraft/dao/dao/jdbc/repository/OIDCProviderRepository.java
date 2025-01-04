package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.OIDCProviderModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OIDCProviderRepository extends JpaRepository<OIDCProviderModel, Long> {

    boolean existsByCode(String code);

    Optional<OIDCProviderModel> findByCode(String code);
}
