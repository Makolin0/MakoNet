package com.makonet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LootDTO {
    private String name;
    private String rarity;
    private String color;
    private String imageUrl;
}
