
package com.example.logindashboard.controller;

import com.example.logindashboard.model.User;
import com.example.logindashboard.service.AuthService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Registration request
    public record RegisterRequest(
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6) String password
    ) {}

    // Login request
    public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank String password
    ) {}

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request) {

        String result = authService.register(
            request.name().trim(),
            request.email().trim().toLowerCase(),
            request.password()
        );

        if (result.equals("Email already registered")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session) {

        String email = request.email().trim().toLowerCase();

        User user = authService.login(
            email,
            request.password()
        );

        if (user == null) {
            return ResponseEntity.status(401)
                .body("Invalid email or password");
        }

        session.setAttribute("userEmail", email);

        return ResponseEntity.ok(
            Map.of(
                "name", user.getName(),
                "email", user.getEmail()
            )
        );
    }

    // Logout API
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {

        session.invalidate();

        return ResponseEntity.ok(
            "Logged out successfully"
        );
    }
}
