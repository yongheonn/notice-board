package com.yongheon.backend.Service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.yongheon.backend.DAO.RegisterDAO;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Inject
    private RegisterDAO dao;
    
    @Override
    public Boolean isExistId(String id) throws Exception {
        return dao.isExistId(id);
    }
}
