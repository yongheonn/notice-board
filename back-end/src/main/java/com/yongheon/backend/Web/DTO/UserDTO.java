package com.yongheon.backend.Web.DTO;

import com.yongheon.backend.Web.DTO.Register.RegisterDTO;

import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String pw;
    private String nick;
    private String email;
    private boolean auth;

    public UserDTO(RegisterDTO data) {
        this.id = data.getId();
        this.pw = data.getPw();
        this.nick = data.getNick();
        this.email = data.getEmail();
        this.auth = false;
    }
}
