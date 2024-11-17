package com.makonet.controllers;

import com.makonet.models.MongoUser;
import com.makonet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @GetMapping("users")
    public List<MongoUser> getUsers() {
        return userRepo.findAll();
    }
}
