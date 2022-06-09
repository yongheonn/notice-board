package com.yongheon.backend.Service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.yongheon.backend.DAO.RegisterDAO;

public class RegisterServiceImpl implements RegisterService {
    @Inject
    private RegisterDAO dao;
    
    public Boolean isExistId(String id) throws Exception {
        return dao.isExistId(id);
    }
}
