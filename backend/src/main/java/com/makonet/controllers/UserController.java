package com.makonet.controllers;

import com.makonet.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {
    List<User> users = new ArrayList<User>(List.of(
            new User(1, "Adam", "123"),
            new User(2, "Kuba", "456"),
            new User(3, "Adrian", "789")
    ));

    @GetMapping("users")
    public List<User> getUsers() {
        return users;
    }

    @PostMapping("users")
    public void addUser(@RequestBody User user) {
        users.add(user);
    }

    @GetMapping("csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }
}
