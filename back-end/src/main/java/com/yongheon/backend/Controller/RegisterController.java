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
}
