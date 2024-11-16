package com.makonet.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {
    @GetMapping
    public ResponseEntity<String> everyone(HttpServletRequest request) {
        return ResponseEntity.ok("Hello everyone " + request.getSession().getId());
    }
}
 