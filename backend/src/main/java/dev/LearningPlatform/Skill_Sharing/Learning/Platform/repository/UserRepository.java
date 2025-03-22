package dev.LearningPlatform.Skill_Sharing.Learning.Platform.repository;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
