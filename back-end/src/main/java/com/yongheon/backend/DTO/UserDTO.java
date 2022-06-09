package com.yongheon.backend.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String pw;
    private String nick;
    private String email;
}
