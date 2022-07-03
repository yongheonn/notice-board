package com.yongheon.backend.Web.Controller;

import java.net.http.HttpResponse;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.yongheon.backend.Web.DTO.Login.LoginDTO;
import com.yongheon.backend.Security.JwtTokenProvider;
import com.yongheon.backend.Security.UserAuthentication;
import com.yongheon.backend.Web.Service.Login.LoginService;
import com.yongheon.backend.Web.Service.Login.LoginService.Status;

@RestController
@RequestMapping(value = "/ajax/login/*")
public class LoginController {
    @Inject
	private LoginService service;

	@Inject 
	private JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "")
	public ResponseEntity<?> login(@RequestBody LoginDTO data, HttpServletResponse response) {
		try {
			Status status = service.login(data);
			if(status == Status.FAIL) return new ResponseEntity<>("Login Fail",HttpStatus.UNAUTHORIZED);	//
			if(status == Status.ERROR) throw new Error();
			Authentication authentication = new UserAuthentication(data.getId(), null, null);
        	String token = jwtTokenProvider.generateToken(authentication);
        	return new ResponseEntity<>(token, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
