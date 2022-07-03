package com.yongheon.backend.Web.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yongheon.backend.Security.UserAuthentication;

@RestController
@RequestMapping(value = "/ajax/main/*")
public class MainController {
    
    @PostMapping(value= "/account")
    public ResponseEntity<?> sendAccount() {
        try {
        String id = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(id == null) return new ResponseEntity<>("Login Fail",HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(id,HttpStatus.OK);
        }
        catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
