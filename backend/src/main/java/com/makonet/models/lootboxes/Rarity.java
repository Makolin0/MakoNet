package com.makonet.models.lootboxes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Rarity {
    private String name;
    private String color;
    private Integer chance;
    private List<Loot> loot;
}
