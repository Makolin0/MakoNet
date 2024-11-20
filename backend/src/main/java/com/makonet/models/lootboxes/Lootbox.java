package com.makonet.models.lootboxes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "lootboxes")
@ToString
public class Lootbox {
    private String id;
    private String name;
    private List<Rarity> rarities;

    public Rarity getRarity(int i) {
        return rarities.get(i);
    }
}
