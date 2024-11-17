package com.makonet.controllers;

import com.makonet.models.MongoUser;
import com.makonet.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("register")
    public MongoUser register(@RequestBody MongoUser user) {
        return userService.saveUser(user);
    }
}
