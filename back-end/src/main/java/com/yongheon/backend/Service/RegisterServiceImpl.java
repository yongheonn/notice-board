package com.yongheon.backend.Service;

import java.util.regex.Pattern;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.yongheon.backend.DAO.RegisterDAO;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Inject
    private RegisterDAO dao;
    
    @Override
    public Boolean idRegExp(String id) throws Exception {
        return true;
        //return dao.isExistId(id) != null;
    }

    @Override
    public Boolean emailRegExp(String email) throws Exception {
        String regExp = "/^[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*@[0-9|a-z|A-Z]([-_.]?[0-9|a-z|A-Z])*.[a-z|A-Z]*$/i";
        return Pattern.matches(regExp, email);
    }

    @Override
    public Boolean isExistId(String id) throws Exception {
        System.out.println(id);
        System.out.println(dao.isExistId(id));
        return dao.isExistId(id) != null;
    }

    @Override
    public Boolean isExistNick(String nick) throws Exception {
        return dao.isExistNick(nick) != null;
    }

    @Override
    public Boolean isExistEmail(String email) throws Exception {
        return dao.isExistEmail(email) != null;
    }
}
