package com.makonet.dto.lootbox;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LootboxCountDTO {
    private String name;
    private Integer count;

    public LootboxCountDTO(Map.Entry<String, Integer> stringIntegerEntry) {
        this.name = stringIntegerEntry.getKey();
        this.count = stringIntegerEntry.getValue();
    }
}
