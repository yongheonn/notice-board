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
	public Boolean checkIDExist(@RequestBody Map<String, String> id) {
		System.out.println(id);
		try {
			if(service.isExistId(id.get("id")))
				return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return false;
	}
	
}