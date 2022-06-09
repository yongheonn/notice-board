package com.yongheon.backend.DTO;

import lombok.Data;

@Data
public class RegisterDTO {
    private String user_id;
    private String user_pw;
    private String user_pw_check;
    private String user_name;
    private String user_email;
    private String certification;
}
