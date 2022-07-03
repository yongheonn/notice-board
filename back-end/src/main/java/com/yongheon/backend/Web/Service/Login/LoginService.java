package com.yongheon.backend.Web.Service.Login;

import com.yongheon.backend.Web.DTO.Login.LoginDTO;

public interface LoginService {
    public enum Status{
        ERROR, OK, FAIL
    };
    public Status login(LoginDTO loginDTO) throws Exception; 
}