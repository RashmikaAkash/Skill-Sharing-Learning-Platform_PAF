package dev.LearningPlatform.Skill_Sharing.Learning.Platform.service;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.Enroll;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.repository.EnrollRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollService {

    private final EnrollRepository enrollRepository;

    public EnrollService(EnrollRepository enrollRepository) {
        this.enrollRepository = enrollRepository;
    }

    public Enroll createEnrollment(Enroll enroll) {
        return enrollRepository.save(enroll);
    }

    public List<Enroll> getAllEnrollments() {
        return enrollRepository.findAll();
    }
}
