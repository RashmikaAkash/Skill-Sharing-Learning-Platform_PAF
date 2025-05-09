package dev.LearningPlatform.Skill_Sharing.Learning.Platform.controller;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.Enroll;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.service.EnrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollController {

    private final EnrollService enrollService;

    public EnrollController(EnrollService enrollService) {
        this.enrollService = enrollService;
    }

    @PostMapping
    public ResponseEntity<Enroll> createEnrollment(@Valid @RequestBody Enroll enroll) {
        Enroll savedEnroll = enrollService.createEnrollment(enroll);
        return ResponseEntity.ok(savedEnroll);
    }

    @GetMapping
    public ResponseEntity<List<Enroll>> getAllEnrollments() {
        List<Enroll> enrollments = enrollService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }
}
