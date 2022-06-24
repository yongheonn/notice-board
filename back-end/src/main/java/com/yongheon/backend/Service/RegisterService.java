package com.yongheon.backend.Service;

import org.springframework.stereotype.Service;

public interface RegisterService {
    public Boolean idRegExp(String id) throws Exception;
    public Boolean emailRegExp(String email) throws Exception;
    public Boolean isExistId(String id) throws Exception; 
    public Boolean isExistNick(String nick) throws Exception;
    public Boolean isExistEmail(String email) throws Exception;
}