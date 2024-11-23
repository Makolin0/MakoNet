package com.makonet.services;

import com.makonet.dto.admin.AdminUserDetailsDTO;
import com.makonet.dto.user.UserInfoDTO;
import com.makonet.models.users.MongoUser;
import com.makonet.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminService {
    private UserRepository userRepo;

    public List<UserInfoDTO> getUsers() {
        List<MongoUser> allUsers = userRepo.findAll();
        return allUsers.stream().map(UserInfoDTO::new).toList();
    }

    public AdminUserDetailsDTO getUserDetails(String email) {
        MongoUser user = userRepo.findFirstByEmail(email);
        return new AdminUserDetailsDTO(user);
    }
}
