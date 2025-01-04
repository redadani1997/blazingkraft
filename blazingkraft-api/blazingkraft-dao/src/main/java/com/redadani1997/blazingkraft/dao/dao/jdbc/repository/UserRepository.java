package com.redadani1997.blazingkraft.dao.dao.jdbc.repository;

import com.redadani1997.blazingkraft.dao.model.UserModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    boolean existsByEmail(String email);

    Optional<UserModel> findByEmail(String email);

    boolean existsByEmailAndPassword(String email, String password);

    Optional<UserModel> findByEmailAndPassword(String email, String password);
}
