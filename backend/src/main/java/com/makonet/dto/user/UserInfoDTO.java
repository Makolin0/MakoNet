package com.makonet.dto.user;

import com.makonet.models.users.MongoUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {
    private String username;
    private String email;
    private List<String> roles;

    public UserInfoDTO(MongoUser user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.roles = user.getRoles().stream().map(SimpleGrantedAuthority::getAuthority).toList();
    }
}
