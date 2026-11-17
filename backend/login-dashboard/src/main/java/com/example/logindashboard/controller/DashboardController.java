
package com.example.logindashboard.controller;

import com.example.logindashboard.model.User;
import com.example.logindashboard.service.AuthService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class DashboardController {

    private final AuthService authService;

    public DashboardController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<?> getDashboard(HttpSession session) {

        String email = (String)
                session.getAttribute("userEmail");

        if (email == null) {
            return ResponseEntity.status(401)
                    .body("Please login first");
        }

        User user = authService.getUser(email);

        return ResponseEntity.ok(Map.of(
            "name", user.getName(),
            "email", user.getEmail(),
            "totalUsers", 120,
            "activeSessions", 24,
            "notifications", 8,
            "accountStatus", "Active"
        ));
    }
}
