package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.UserDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.UserRepository;
import com.redadani1997.blazingkraft.dao.model.UserModel;
import com.redadani1997.blazingkraft.error.management.UserException;
import java.util.List;
import java.util.Optional;

public class UserJdbcDao implements UserDao {
    private final UserRepository repository;

    public UserJdbcDao(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByEmail(String email) {
        return this.repository.existsByEmail(email);
    }

    @Override
    public UserModel findByEmail(String email) {
        Optional<UserModel> modelOptional = this.repository.findByEmail(email);
        if (modelOptional.isEmpty()) {
            throw new UserException(String.format("User not found for email '%s'", email));
        }
        return modelOptional.get();
    }

    @Override
    public Boolean existsByEmailAndPassword(String email, String password) {
        return this.repository.existsByEmailAndPassword(email, password);
    }

    @Override
    public UserModel findByEmailAndPassword(String email, String password) {
        Optional<UserModel> modelOptional = this.repository.findByEmailAndPassword(email, password);
        if (modelOptional.isEmpty()) {
            throw new UserException(
                    String.format("User not found for email '%s' and password '%s'", email, password));
        }
        return modelOptional.get();
    }

    @Override
    public UserModel create(UserModel model) {
        if (existsByEmail(model.getEmail())) {
            throw new UserException(String.format("User '%s' already exists!", model.getEmail()));
        }

        return this.repository.save(model);
    }

    @Override
    public UserModel update(UserModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<UserModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
