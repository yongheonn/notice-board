package com.yongheon.backend.DAO;
import java.util.List;

import javax.inject.Inject;

import org.apache.catalina.webresources.Cache;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class RegisterDAOImpl implements RegisterDAO {

    @Inject
	private SqlSession sqlSession;
	
	private String namespace = "com.user.mappers";

	public Boolean isExistId(String id) {
        try {
		return !sqlSession.selectOne(namespace + ".isExistId", id).equals("");
        }
        catch(Exception e) {
            e.printStackTrace();
            return false;
        }
	}
}