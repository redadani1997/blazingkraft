package com.redadani1997.blazingkraft.dao.dao;

import com.redadani1997.blazingkraft.dao.model.GroupModel;
import java.util.List;

public interface GroupDao {

    Boolean existsByCode(String code);

    GroupModel findByCode(String code);

    GroupModel create(GroupModel model);

    GroupModel update(GroupModel model);

    List<GroupModel> findAll();

    void deleteById(Long id);
}
