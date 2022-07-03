package com.yongheon.backend.Web.Controller;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yongheon.backend.Web.DTO.Register.RegisterDTO;
import com.yongheon.backend.Web.Service.Register.RegisterService;


@RestController
@RequestMapping(value = "/ajax/register/*")
public class RegisterController {

	@Inject
	private RegisterService service;
	 
	@PostMapping(value = "")
	public Boolean register(@RequestBody RegisterDTO data) {
		try {
			Boolean response = service.register(data);	//
			System.out.println(response);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@PostMapping(value = "/id_check")
	public Boolean checkIDExist(@RequestBody Map<String, String> id) {
		try {
			return service.validId(id.get("data"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/nick_check")
	public Boolean checkNickExist(@RequestBody Map <String, String> nick) {
		try {
			return service.validNick(nick.get("data"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}

	@PostMapping(value = "/email_check")
	public Boolean checkEmailExist(@RequestBody Map <String, String> email) {
		try {
			return service.validEmail(email.get("data"));
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}
}
