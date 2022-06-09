package com.yongheon.backend.DAO;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


public interface RegisterDAO {
    public Boolean isExistId(String id) throws Exception; 
}
