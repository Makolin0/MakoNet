package com.makonet.services;

import com.makonet.dto.LoginDTO;
import com.makonet.dto.RegisterDTO;
import com.makonet.models.Lootboxes;
import com.makonet.models.MongoUser;
import com.makonet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public MongoUser saveUser(RegisterDTO register) {
        if(!register.getPassword().equals(register.getConfirmPassword())) {
            return null;
        }

        MongoUser user = new MongoUser();

        user.setUsername(register.getUsername());
        user.setEmail(register.getEmail());
        user.setPassword(encoder.encode(register.getPassword()));
        user.setRegistrationTime(LocalDateTime.now());
        user.setRoles(new ArrayList<>(List.of(new SimpleGrantedAuthority("ROLE_USER"))));
        user.setLootboxes(new Lootboxes());

        return userRepo.save(user);
    }

    public String generateJwt(LoginDTO credentials) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword()));

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(credentials.getUsername());
        } else {
            return "Login failed";
        }
    }
}
