package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataMaskingRepository extends JpaRepository<DataMaskingModel, Long> {

    boolean existsByCode(String code);

    Optional<DataMaskingModel> findByCode(String code);
}
