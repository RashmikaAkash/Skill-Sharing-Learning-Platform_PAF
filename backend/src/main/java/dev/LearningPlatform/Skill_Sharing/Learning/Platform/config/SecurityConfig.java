package dev.LearningPlatform.Skill_Sharing.Learning.Platform.config;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          .cors(cors -> cors.configurationSource(corsConfigurationSource))
          .csrf(cs -> cs.disable())
          .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeHttpRequests(auth -> auth
              .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
              .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
              .requestMatchers("/", "/api/users/**", "/api/comments/**").permitAll()
              .anyRequest().authenticated()
          )
          .addFilterBefore(
              new JwtAuthenticationFilter(jwtUtil, userDetailsService),
              org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
          );
        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                   .userDetailsService(userDetailsService)
                   .passwordEncoder(passwordEncoder())
                   .and()
                   .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}