package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.ServerPermissionsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerPermissionsRepository extends JpaRepository<ServerPermissionsModel, Long> {}
