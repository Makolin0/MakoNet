package com.makonet.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class testController {
    @GetMapping
    public ResponseEntity<String> everyone() {
        return ResponseEntity.ok("Hello everyone ");
    }
}
 