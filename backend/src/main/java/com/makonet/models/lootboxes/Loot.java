package com.makonet.models.lootboxes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Loot {
    private String id;
    private String name;
    private String imageUrl;
}
