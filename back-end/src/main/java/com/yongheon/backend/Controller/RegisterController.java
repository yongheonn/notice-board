package com.yongheon.backend.Controller;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yongheon.backend.DTO.RegisterDTO;
import com.yongheon.backend.Service.RegisterService;

import lombok.Data;


@RestController
@RequestMapping(value = "/forms/register/*")
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
			return service.isExistId(id.get("id"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/nick_check")
	public boolean checkNickExist(@RequestBody Map <String, String> nick) {
		try {
			return service.isExistNick(nick.get("nick"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/email_check")
	public boolean checkEmailExist(@RequestBody Map <String, String> email) {
		try {
			return service.isExistEmail(email.get("email"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}
}
