package com.yongheon.backend.DTO;

import org.springframework.web.bind.annotation.ResponseBody;

import lombok.Data;

@Data
public class BoardDTO {
    private int id;
    private String title;
    private String contents;
    private String nickname;
    private String date;
    private int view;
    private int recommend;
}