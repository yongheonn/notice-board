package com.yongheon.backend.Web.Service.Register;

import com.yongheon.backend.Web.DTO.Register.RegisterDTO;

public interface RegisterService {
    public Boolean validId(String id) throws Exception;
    public Boolean validPw(String pw) throws Exception;
    public Boolean validNick(String nick) throws Exception;
    public Boolean validEmail(String email) throws Exception;
    public Boolean register(RegisterDTO registerDTO) throws Exception;
}