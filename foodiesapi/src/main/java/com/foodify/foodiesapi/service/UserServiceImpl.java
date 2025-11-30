package com.foodify.foodiesapi.service;

import com.foodify.foodiesapi.entity.UserEntity;
import com.foodify.foodiesapi.exception.EmailAlreadyExistsException;
import com.foodify.foodiesapi.io.UserRequest;
import com.foodify.foodiesapi.io.UserResponse;
import com.foodify.foodiesapi.repository.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AutthenticationFacade autthenticationFacade;

    @Override
    public UserResponse registerUser(UserRequest request) {
        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public String findByUserId() {
        String loggedInUserEmail = autthenticationFacade.getAuthentication().getName();
        UserEntity loggedInUser = userRepository.findByEmail(loggedInUserEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return loggedInUser.getId();
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                // DON'T set role field - leave it null for regular users
                .build();
    }

    private UserResponse convertToResponse(UserEntity registeredUser) {
        return UserResponse.builder()
                .id(registeredUser.getId())
                .name(registeredUser.getName())
                .email(registeredUser.getEmail())
                .role(registeredUser.getRole() != null ? registeredUser.getRole() : "USER") // Return USER even if null
                .build();
    }
}