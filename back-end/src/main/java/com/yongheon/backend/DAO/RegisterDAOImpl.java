package com.yongheon.backend.DAO;
import java.util.List;

import javax.inject.Inject;

import org.apache.catalina.webresources.Cache;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public class RegisterDAOImpl implements RegisterDAO {

    @Inject
	private SqlSession sqlSession;
	
	private String namespace = "com.user.mappers";

	@Override
	public Boolean isExistId(String id) {
        try {
		return !sqlSession.selectOne(namespace + ".isExistId", id).equals("");
        }
        catch(Exception e) {
            e.printStackTrace();
            System.out.println("select problem");
            return false;
        }
	}
}