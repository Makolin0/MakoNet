package com.makonet.controllers;

import com.makonet.MyUser;
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
    List<MyUser> myUsers = new ArrayList<>(List.of(
            new MyUser(1, "Adam", "123"),
            new MyUser(2, "Kuba", "456"),
            new MyUser(3, "Adrian", "789")
    ));

    @GetMapping("users")
    public List<MyUser> getUsers() {
        return myUsers;
    }

    @PostMapping("users")
    public void addUser(@RequestBody MyUser myUser) {
        myUsers.add(myUser);
    }

    @GetMapping("csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }
}
