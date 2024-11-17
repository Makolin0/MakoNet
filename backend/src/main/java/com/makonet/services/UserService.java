package com.makonet.services;

import com.makonet.models.Lootboxes;
import com.makonet.models.MongoUser;
import com.makonet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public MongoUser saveUser(MongoUser user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRegistrationTime(LocalDateTime.now());
        user.setRoles(new ArrayList<>(List.of(new SimpleGrantedAuthority("ROLE_USER"))));
        user.setLootboxes(new Lootboxes());
        return userRepo.save(user);
    }
}
