package com.makonet.services;

import com.makonet.dto.user.LoginDTO;
import com.makonet.dto.user.RegisterDTO;
import com.makonet.dto.user.UserInfoDTO;
import com.makonet.models.users.MongoUser;
import com.makonet.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepo;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String saveUser(RegisterDTO register) {
        if(!register.getPassword().equals(register.getConfirmPassword())) {
            return null;
        }

        register.setPassword(encoder.encode(register.getPassword()));
        MongoUser user = new MongoUser(register);
        userRepo.save(user);

        LoginDTO credentials = new LoginDTO(user.getEmail(), user.getPassword());
        return generateJwt(credentials);
    }

    public String generateJwt(LoginDTO credentials) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword()));

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(credentials.getEmail());
        } else {
            return "Login failed";
        }
    }

    public UserInfoDTO getInfo(String email) {
        MongoUser user = userRepo.findFirstByEmail(email);

        return new UserInfoDTO(user);
    }
}
