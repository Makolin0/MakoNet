package com.makonet.models.users;

import com.makonet.dto.user.RegisterDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
@ToString
public class MongoUser {
    private String id;
    private String username;
    private String email;
    private String password;
    private LocalDateTime registrationTime;
    private List<SimpleGrantedAuthority> roles;
    private UserLootbox userLootbox;

    public MongoUser(RegisterDTO registerDTO) {
        this.username = registerDTO.getUsername();
        this.email = registerDTO.getEmail();
        this.password = registerDTO.getPassword();
        this.registrationTime = LocalDateTime.now();
        this.roles = new ArrayList<>(List.of(new SimpleGrantedAuthority("ROLE_USER")));
        this.userLootbox = new UserLootbox();
    }
}
