package com.foodify.foodiesapi.controller;

import com.foodify.foodiesapi.io.UserRequest;
import com.foodify.foodiesapi.io.UserResponse;
import com.foodify.foodiesapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.registerUser(request);
    }

    // TEMPORARY ENDPOINT - Remove after creating admin
    @PostMapping("/register-admin")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerAdmin(@RequestBody UserRequest request) {
        request.setRole("ADMIN");
        return userService.registerUser(request);
    }
}