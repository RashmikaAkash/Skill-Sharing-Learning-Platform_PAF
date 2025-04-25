package dev.LearningPlatform.Skill_Sharing.Learning.Platform.controller;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.User;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.service.UserService;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend requests
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    // Get all users
    @GetMapping
    public @ResponseBody List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new user
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createUser(
            @RequestParam("name") String name,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("age") int age,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "profilePhoto", required = false) MultipartFile profilePhoto,
            @RequestParam(value = "coverPhoto", required = false) MultipartFile coverPhoto) {
        
        try {
            User user = new User();
            user.setName(name);
            user.setUsername(username);
            user.setEmail(email);
            user.setAge(age);
            user.setLocation(location);
            user.setBio(bio);
            
            // Handle profile photo upload
            if (profilePhoto != null && !profilePhoto.isEmpty()) {
                String fileName = fileStorageService.storeFile(profilePhoto);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/users/files/")
                    .path(fileName)
                    .toUriString();
                user.setProfilePhotoUrl(fileDownloadUri);
            }
            
            // Handle cover photo upload
            if (coverPhoto != null && !coverPhoto.isEmpty()) {
                String fileName = fileStorageService.storeFile(coverPhoto);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/users/files/")
                    .path(fileName)
                    .toUriString();
                user.setCoverPhotoUrl(fileDownloadUri);
            }
            
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (DuplicateKeyException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Email already exists");
        }
    }

    // Update user by ID
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUser(
            @PathVariable String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "age", required = false) Integer age,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "profilePhoto", required = false) MultipartFile profilePhoto,
            @RequestParam(value = "coverPhoto", required = false) MultipartFile coverPhoto) {
        
        try {
            User userDetails = new User();
            if (name != null) userDetails.setName(name);
            if (username != null) userDetails.setUsername(username);
            if (email != null) userDetails.setEmail(email);
            if (age != null) userDetails.setAge(age);
            if (location != null) userDetails.setLocation(location);
            if (bio != null) userDetails.setBio(bio);
            
            // Handle profile photo upload
            if (profilePhoto != null && !profilePhoto.isEmpty()) {
                String fileName = fileStorageService.storeFile(profilePhoto);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/users/files/")
                    .path(fileName)
                    .toUriString();
                userDetails.setProfilePhotoUrl(fileDownloadUri);
            }
            
            // Handle cover photo upload
            if (coverPhoto != null && !coverPhoto.isEmpty()) {
                String fileName = fileStorageService.storeFile(coverPhoto);
                String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/users/files/")
                    .path(fileName)
                    .toUriString();
                userDetails.setCoverPhotoUrl(fileDownloadUri);
            }
            
            User updatedUser = userService.updateUser(id, userDetails);
            return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();
        } catch (DuplicateKeyException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Email already exists");
        }
    }

    // Serve files
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<byte[]> serveFile(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageService.getFilePath(fileName);
            byte[] fileContent = Files.readAllBytes(filePath);
            return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(fileContent);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
