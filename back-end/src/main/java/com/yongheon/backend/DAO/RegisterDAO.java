package com.yongheon.backend.DAO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.yongheon.backend.DTO.Temp;

@Mapper
@Repository
public interface RegisterDAO {
    public String isExistId(String id) throws Exception; 
}
