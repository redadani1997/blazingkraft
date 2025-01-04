package com.redadani1997.blazingkraft.dao.dao.jdbc;

import com.redadani1997.blazingkraft.dao.dao.GroupDao;
import com.redadani1997.blazingkraft.dao.dao.jdbc.repository.GroupRepository;
import com.redadani1997.blazingkraft.dao.model.GroupModel;
import com.redadani1997.blazingkraft.error.management.GroupException;
import java.util.List;
import java.util.Optional;

public class GroupJdbcDao implements GroupDao {
    private final GroupRepository repository;

    public GroupJdbcDao(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public Boolean existsByCode(String code) {
        return this.repository.existsByCode(code);
    }

    @Override
    public GroupModel findByCode(String code) {
        Optional<GroupModel> modelOptional = this.repository.findByCode(code);
        if (modelOptional.isEmpty()) {
            throw new GroupException(String.format("Group not found for code '%s'", code));
        }
        return modelOptional.get();
    }

    @Override
    public GroupModel create(GroupModel model) {
        if (existsByCode(model.getCode())) {
            throw new GroupException(String.format("Group '%s' already exists!", model.getCode()));
        }

        return this.repository.save(model);
    }

    @Override
    public GroupModel update(GroupModel model) {
        return this.repository.save(model);
    }

    @Override
    public List<GroupModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        this.repository.deleteById(id);
    }
}
