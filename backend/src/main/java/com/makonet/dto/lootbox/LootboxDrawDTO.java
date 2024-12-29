package com.makonet.dto.lootbox;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LootboxDrawDTO {
    private LootDTO reward;
    private List<LootDTO> fillerList;
}
