package com.yongheon.backend.Service;

import org.springframework.stereotype.Service;

public interface RegisterService {
    public Boolean isExistId(String id) throws Exception; 
    public Boolean isExistNick(String nick) throws Exception;
    public Boolean isExistEmail(String email) throws Exception;
}