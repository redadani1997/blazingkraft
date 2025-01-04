package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.UserModel;
import java.util.List;

public interface UserDao {

    Boolean existsByEmail(String email);

    UserModel findByEmail(String email);

    Boolean existsByEmailAndPassword(String email, String password);

    UserModel findByEmailAndPassword(String email, String password);

    UserModel create(UserModel model);

    UserModel update(UserModel model);

    List<UserModel> findAll();

    void deleteById(Long id);
}
