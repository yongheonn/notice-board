package com.yongheon.backend.DAO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface RegisterDAO {
    public String isExistId(String id) throws Exception; 
    public String isExistNick(String nick) throws Exception;
    public String isExistEmail(String email) throws Exception;
}
