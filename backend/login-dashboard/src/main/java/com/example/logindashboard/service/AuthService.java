
package com.example.logindashboard.service;

import com.example.logindashboard.model.User;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class AuthService {

    // Store registered users in memory
    private final Map<String, User> users =
            new ConcurrentHashMap<>();

    private final PasswordEncoder passwordEncoder;

    // Constructor
    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    // User Registration
    public String register(String name, String email,
                           String password) {

        String encodedPassword =
                passwordEncoder.encode(password);

        User user = new User(
                name, email, encodedPassword
        );

        User existing = users.putIfAbsent(email, user);

        if (existing != null) {
            return "Email already registered";
        }

        return "Registration successful";
    }

    // User Login
    public User login(String email, String password) {

        User user = users.get(email);

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(
                password, user.getPassword())) {
            return null;
        }

        return user;
    }

    // Get user details
    public User getUser(String email) {
        return users.get(email);
    }
}
