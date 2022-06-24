package com.yongheon.backend.Controller;

import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yongheon.backend.DTO.Register.CertDTO;
import com.yongheon.backend.DTO.Register.RegisterDTO;
import com.yongheon.backend.Service.RegisterService;

import lombok.Data;


@RestController
@RequestMapping(value = "/ajax/register/*")
public class RegisterController {

	@Inject
	private RegisterService service;
	 
	@PostMapping(value = "")
	public String list(RegisterDTO registerDTO) {

		return registerDTO.toString();
	}

	@PostMapping(value = "/id_check")
	public boolean checkIDExist(@RequestBody Map<String, String> id) {
		try {
			
			
			return service.isExistId(id.get("data"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/nick_check")
	public boolean checkNickExist(@RequestBody Map <String, String> nick) {
		try {
			return service.isExistNick(nick.get("data"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/email_check")
	public boolean checkEmailExist(@RequestBody Map <String, String> email) {
		try {
			return service.isExistEmail(email.get("data"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/request_cert")
	public boolean certCert(@RequestBody RegisterDTO data, HttpServletRequest request) {
		try {
			String ip = request.getHeader("X-Forwarded-For");
    		if (ip == null) 
				ip = request.getHeader("Proxy-Client-IP");
    		if (ip == null) 
    			ip = request.getHeader("WL-Proxy-Client-IP");
    		if (ip == null) 
    		    ip = request.getHeader("HTTP_CLIENT_IP");
    		if (ip == null) 
    		    ip = request.getHeader("HTTP_X_FORWARDED_FOR");
    		if (ip == null) 
    		    ip = request.getRemoteAddr();	

			if(service.isExistId(data.getId()))
				return false;
			
			if(service.isExistNick(data.getNick()))
				return false;	

			if(service.isExistEmail(data.getEmail()))
				return false;
			
			return true;	//
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@PostMapping(value = "/cert")
	public boolean checkCert(@RequestBody Map <String, String> code, HttpServletRequest request) {
		try {
			String ip = request.getHeader("X-Forwarded-For");
    		if (ip == null) 
				ip = request.getHeader("Proxy-Client-IP");
    		if (ip == null) 
    			ip = request.getHeader("WL-Proxy-Client-IP");
    		if (ip == null) 
    		    ip = request.getHeader("HTTP_CLIENT_IP");
    		if (ip == null) 
    		    ip = request.getHeader("HTTP_X_FORWARDED_FOR");
    		if (ip == null) 
    		    ip = request.getRemoteAddr();	
			
			return false;	//
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
