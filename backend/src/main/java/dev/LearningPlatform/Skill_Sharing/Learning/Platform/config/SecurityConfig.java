package dev.LearningPlatform.Skill_Sharing.Learning.Platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    // Define the security filter chain that configures HTTP security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        // Allow public access to the root endpoint ("/")
                        .requestMatchers("/").permitAll()
                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                // Enable form-based login with default settings
                .formLogin(Customizer.withDefaults())
                // Enable HTTP Basic authentication
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    // Define an in-memory user store with a single user
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(
                User.withUsername("user")
                        .password(encoder.encode("password"))
                        .roles("USER")
                        .build()
        );
        return manager;
    }

    // Define the password encoder bean (using BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
