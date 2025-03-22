package com.makonet.controllers;

import com.makonet.dto.user.LoginDTO;
import com.makonet.dto.user.RegisterDTO;
import com.makonet.dto.user.UserInfoDTO;
import com.makonet.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO register) {
        return userService.saveUser(register);
    }

    @PostMapping("login")
    public String login(@RequestBody LoginDTO credentials) {
        return userService.generateJwt(credentials);
    }

    @GetMapping("info")
    public UserInfoDTO info(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getInfo(userDetails.getUsername());
    }
}
