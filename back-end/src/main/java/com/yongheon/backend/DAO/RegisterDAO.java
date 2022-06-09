package com.yongheon.backend.DAO;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

public interface RegisterDAO {
    public Boolean isExistId(String id) throws Exception; 
}
