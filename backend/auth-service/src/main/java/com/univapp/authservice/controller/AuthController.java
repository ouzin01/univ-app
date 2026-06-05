package com.univapp.authservice.controller;

import com.univapp.authservice.config.JwtUtil;
import com.univapp.authservice.dto.AuthResponse;
import com.univapp.authservice.dto.LoginRequest;
import com.univapp.authservice.dto.RegisterRequest;
import com.univapp.authservice.entity.User;
import com.univapp.authservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token);
        return ResponseEntity.ok(authService.getUserByUsername(username));
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getRoles() {
        return ResponseEntity.ok(
            List.of("ADMIN", "ETUDIANT", "ENSEIGNANT", "ENSEIGNANT_ASSOCIE", "RESPONSABLE_FORMATION", "TUTEUR")
        );
    }
}