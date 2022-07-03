package com.yongheon.backend.Web.Controller;

import java.net.URI;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yongheon.backend.Web.Service.VerifyEmailService;

@RestController
@RequestMapping(value = "/ajax/auth/*")
public class AuthController {
 //   private final VerifyEmailService verifyEmailService;
 //   private final UserService userService;

    @GetMapping("/verify")
    public ResponseEntity verify(@RequestParam String email) throws NotFoundException {
        //User user = userService.searchUserByEmail(email);
     //   if(user!=null) {
      //      userPasswordResetVerifyEmailService.sendVerificationMail(user.getEmail());
   //         return new ResponseEntity(HttpStatus.OK);
   //     }
     //   else return new ResponseEntity(HttpStatus.NO_CONTENT);
     return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/verify/{key}")
    public ResponseEntity getVerify(@PathVariable String key) throws NotFoundException {
        try {
   //         userPasswordResetVerifyEmailService.verifyEmail(key);
            URI redirectUri = new URI("http://{재설정 path}");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);
            return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
        }
        catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
