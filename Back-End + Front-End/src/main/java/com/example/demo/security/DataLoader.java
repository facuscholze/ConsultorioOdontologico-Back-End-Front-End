package com.example.demo.security;

import com.example.demo.model.AppUser;
import com.example.demo.model.AppUserRole;
import com.example.demo.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    private  AppUserRepository appUserRepository;


    public void run(ApplicationArguments args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode("password");
        appUserRepository.save(new AppUser("user", "pass", "FacuYamall@digital.com",
                hashedPassword, AppUserRole.ADMIN));
    }
}




