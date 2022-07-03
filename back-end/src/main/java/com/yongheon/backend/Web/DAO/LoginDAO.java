package com.yongheon.backend.Web.DAO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.yongheon.backend.Web.DTO.Login.LoginDTO;

@Mapper
@Repository
public interface LoginDAO {
    public String login(LoginDTO loginDTO);
}
