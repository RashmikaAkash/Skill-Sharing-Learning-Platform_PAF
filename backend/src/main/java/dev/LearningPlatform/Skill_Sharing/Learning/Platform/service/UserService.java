package dev.LearningPlatform.Skill_Sharing.Learning.Platform.service;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.User;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateKeyException("Email already exists");
        }
        return userRepository.save(user);
    }

    public User updateUser(String id, User userDetails) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            // Check if email is being changed and if it already exists
            if (!user.getEmail().equals(userDetails.getEmail())) {
                if (userRepository.findByEmail(userDetails.getEmail()).isPresent()) {
                    throw new DuplicateKeyException("Email already exists");
                }
            }
            
            user.setName(userDetails.getName());
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setAge(userDetails.getAge());
            user.setLocation(userDetails.getLocation());
            user.setBio(userDetails.getBio());
            user.setProfilePhotoUrl(userDetails.getProfilePhotoUrl());
            user.setCoverPhotoUrl(userDetails.getCoverPhotoUrl());
            
            return userRepository.save(user);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
