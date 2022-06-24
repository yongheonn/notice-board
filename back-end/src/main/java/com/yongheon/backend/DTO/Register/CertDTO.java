package com.yongheon.backend.DTO.Register;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class CertDTO {
    private Boolean valid;
    private String emailMsg;
}
