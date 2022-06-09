package com.yongheon.backend.Controller;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yongheon.backend.DTO.BoardDTO;



@RestController
@RequestMapping(value = "/forms/write")
public class WriteController {

    @PostMapping(value = "")
	public String writeBoard(@RequestBody BoardDTO boardDTO) {
		System.out.println(boardDTO);
		return "boardDTO";
	}
}
