package com.makonet.controllers;

import com.makonet.dto.admin.AdminUserDetailsDTO;
import com.makonet.dto.user.UserInfoDTO;
import com.makonet.services.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("users")
    public ResponseEntity<List<UserInfoDTO>> getUsers() {
        return ResponseEntity.ok(adminService.getUsers());
    }
    @GetMapping("{name}")
    public ResponseEntity<AdminUserDetailsDTO> getUserDetails(@PathVariable String name) {
        return ResponseEntity.ok(adminService.getUserDetails(name));
    }
}
