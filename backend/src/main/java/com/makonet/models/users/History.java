package com.makonet.models.users;

import com.makonet.dto.lootbox.LootDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class History {
    private LocalDateTime dropTime;
    private LocalDateTime receivedTime;
    private String lootboxName;
    private String name;
    private String color;
    private String rarity;
    private String imageUrl;

    public History(LootDTO reward) {
        this.dropTime = LocalDateTime.now();
        this.receivedTime = null;
        this.lootboxName = reward.getLootboxName();
        this.name = reward.getName();
        this.color = reward.getColor();
        this.rarity = reward.getRarity();
        this.imageUrl = reward.getImageUrl();
    }
}
