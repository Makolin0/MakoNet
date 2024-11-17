package com.makonet.controllers;

import com.makonet.models.MongoUser;
import com.makonet.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.CsrfToken;
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

//    @PostMapping("users")
//    public void addUser(@RequestBody MyUser myUser) {
//        myUsers.add(myUser);
//    }

    @GetMapping("csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }
}
