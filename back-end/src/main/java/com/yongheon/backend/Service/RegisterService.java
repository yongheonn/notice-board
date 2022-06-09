package com.yongheon.backend.Service;

import org.springframework.stereotype.Service;

public interface RegisterService {
    public Boolean isExistId(String id) throws Exception; 
}
