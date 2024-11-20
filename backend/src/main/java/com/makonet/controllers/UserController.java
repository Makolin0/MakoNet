package com.makonet.controllers;

import com.makonet.dto.LoginDTO;
import com.makonet.dto.RegisterDTO;
import com.makonet.models.users.MongoUser;
import com.makonet.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @PostMapping("register")
    public MongoUser register(@RequestBody RegisterDTO register) {
        return userService.saveUser(register);
    }

    @PostMapping("login")
    public String login(@RequestBody LoginDTO credentials) {
        return userService.generateJwt(credentials);
    }

    @GetMapping("check")
    public String check() {
        return "Logged in";
    }
}
