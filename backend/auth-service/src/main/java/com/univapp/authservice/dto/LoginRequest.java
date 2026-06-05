package com.univapp.authservice.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class LoginRequest {
    @NotBlank(message = "Username obligatoire")
    private String username;

    @NotBlank(message = "Password obligatoire")
    private String password;
}