package com.yongheon.backend.Web.Service;
import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class VerifyEmailService{
    private final RedisUtilService redisUtil;
    @Autowired
    private JavaMailSender emailSender;

    public void sendMail(String to,String sub, String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(sub);
        message.setText(text);
        emailSender.send(message);
    }
    public void sendVerificationMail(String email) throws NotFoundException {
        String VERIFICATION_LINK = "http://192.168.0.19/ajax/user/verify/";
        if(email==null) throw new NotFoundException("멤버가 조회되지 않음");
        UUID uuid = UUID.randomUUID();
        // redis에 링크 정보 저장
        redisUtil.setDataExpire(uuid.toString(),email, 60 * 30L);
        // 인증 링크 전송
         sendMail(email,"비밀번호 재설정 인증메일입니다.",VERIFICATION_LINK+uuid.toString());
    }
    public void verifyEmail(String key) throws NotFoundException {
        String memberEmail = redisUtil.getData(key);
        if(memberEmail==null) throw new NotFoundException("유효하지 않은 링크입니다.");
        redisUtil.deleteData(key);
    }
}