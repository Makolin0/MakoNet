package com.makonet.dto.admin;

import com.makonet.dto.lootbox.LootDTO;
import com.makonet.dto.lootbox.LootboxCountDTO;
import com.makonet.models.users.MongoUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserDetailsDTO {
    private List<LootboxCountDTO> count;
    private List<LootDTO> history;

    public AdminUserDetailsDTO(MongoUser user) {
        this.count = user.getUserLootbox().getUnopened().entrySet().stream().map(LootboxCountDTO::new).toList();
        this.history = user.getUserLootbox().getHistory().stream().map(LootDTO::new).toList();
    }
}
