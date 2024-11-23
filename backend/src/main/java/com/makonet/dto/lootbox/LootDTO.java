package com.makonet.dto.lootbox;

import com.makonet.models.users.History;
import com.makonet.services.Formatter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LootDTO {
    private String lootboxName;
    private String name;
    private String rarity;
    private String color;
    private String imageUrl;
    private String dropTime;
    private String receivedTime;

    public LootDTO(History h) {
        this.lootboxName = h.getLootboxName();
        this.name = h.getName();
        this.rarity = h.getRarity();
        this.color = h.getColor();
        this.imageUrl = h.getImageUrl();
        this.dropTime = h.getDropTime().format(Formatter.dateFormatter);
        if(receivedTime != null) {
            this.receivedTime = h.getReceivedTime().format(Formatter.dateFormatter);
        } else {
            this.receivedTime = null;
        }
    }
}
