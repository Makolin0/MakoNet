package com.makonet.services;

import com.makonet.dto.LootDTO;
import com.makonet.dto.LootboxDrawDTO;
import com.makonet.models.lootboxes.Loot;
import com.makonet.models.lootboxes.Lootbox;
import com.makonet.models.lootboxes.Rarity;
import com.makonet.repository.LootboxRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class LootboxService {
    private final LootboxRepository lootboxRepo;

    public List<String> getNames() {
        return lootboxRepo.findAll().stream().map(Lootbox::getName).toList();
    }

    public Lootbox getInfo(String name) {
        return lootboxRepo.findFirstByName(name);
    }

    public LootboxDrawDTO drawDemo(String name){
        return drawLoot(name);
    }

    private LootDTO drawSingle(String name) {
        Lootbox lootbox = lootboxRepo.findFirstByName(name);

        int rand = (int)(Math.random() * 1000);
        int check = 0;
        for(int i = 0; i < lootbox.getRarities().size(); i++) {
            Rarity rarity = lootbox.getRarity(i);

            check += rarity.getChance();
            if(rand <= check) {
                int randLoot = (int)(Math.random() * rarity.getLoot().size());
                Loot loot = rarity.getLoot(randLoot);

                LootDTO reward = new LootDTO();
                reward.setName(loot.getName());
                reward.setImageUrl(loot.getImageUrl());
                reward.setRarity(rarity.getName());
                reward.setColor(rarity.getColor());

                return reward;
            }
        }

        Rarity rarity = lootbox.getRarities().getLast();
        int randLoot = (int)(Math.random() * rarity.getLoot().size());
        Loot loot = rarity.getLoot(randLoot);

        LootDTO reward = new LootDTO();
        reward.setName(loot.getName());
        reward.setImageUrl(loot.getImageUrl());
        reward.setRarity(rarity.getName());
        reward.setColor(rarity.getColor());

        return reward;
    }

    private LootboxDrawDTO drawLoot(String name) {
        LootboxDrawDTO draw = new LootboxDrawDTO();
        draw.setReward(drawSingle(name));

        List<LootDTO> fillerList = new ArrayList<>();
        for(int i = 0; i < 100; i++){
            fillerList.add(drawSingle(name));
        }
        draw.setFillerList(fillerList);

        return draw;
    }
}
