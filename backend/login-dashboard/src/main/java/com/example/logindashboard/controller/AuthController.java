
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
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "https://lumina-login-dashboard.vercel.app"
    },
    allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request) {


        String result = authService.register(
        	    request.name(),
        	    request.email(),
        	    request.password()
        	);

        if ("Email already registered".equals(result)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", result));
        }

        return ResponseEntity.ok(
                Map.of("message", "Registration successful")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session) {

        User user = authService.login(
                request.email(),
                request.password()
        );

        if (user == null) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                        "message", "Invalid email or password"
                    ));
        }

        session.setAttribute("userEmail", user.getEmail());

        return ResponseEntity.ok(
                Map.of(
                    "message", "Login successful",
                    "name", user.getName(),
                    "email", user.getEmail()
                )
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {

        session.invalidate();

        return ResponseEntity.ok(
                Map.of("message", "Logout successful")
        );
    }

    public record RegisterRequest(
            @NotBlank String name,
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6) String password
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}
}
