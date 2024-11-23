package com.makonet.services;

import com.makonet.dto.lootbox.LootDTO;
import com.makonet.dto.lootbox.LootboxDrawDTO;
import com.makonet.dto.lootbox.LootboxCountDTO;
import com.makonet.models.lootboxes.Loot;
import com.makonet.models.lootboxes.Lootbox;
import com.makonet.models.lootboxes.Rarity;
import com.makonet.models.users.History;
import com.makonet.models.users.MongoUser;
import com.makonet.repository.LootboxRepository;
import com.makonet.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class LootboxService {
    private final LootboxRepository lootboxRepo;
    private final UserRepository userRepo;

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
                reward.setLootboxName(lootbox.getName());
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

        draw.getReward().setDropTime(LocalDateTime.now().format(Formatter.dateFormatter));

        return draw;
    }

    public LootboxDrawDTO draw(String email, String name) throws IllegalAccessException {
        MongoUser user = userRepo.findFirstByEmail(email);

        int count = user.getUserLootbox().getUnopened().get(name);
        if(count > 0){
            user.getUserLootbox().getUnopened().replace(name, count - 1);
            LootboxDrawDTO draw = drawLoot(name);

            user.getUserLootbox().getHistory().add(new History(draw.getReward()));
            userRepo.save(user);
            return draw;
        } else throw new IllegalAccessException();
    }

    public List<LootboxCountDTO> getLootboxCount(String email) {
        List<LootboxCountDTO> count = new ArrayList<>();
        List<String> list = lootboxRepo.findAll().stream().map(Lootbox::getName).toList();
        MongoUser user = userRepo.findFirstByEmail(email);

        for(String name : list) {
            LootboxCountDTO lootboxCountDTO = new LootboxCountDTO();
            lootboxCountDTO.setName(name);
            Integer value = user.getUserLootbox().getUnopened().get(name);
            lootboxCountDTO.setCount(Objects.requireNonNullElse(value, 0));
            count.add(lootboxCountDTO);
        }

        return count;
    }

    public LootboxCountDTO getLootboxNameCount(String email, String name) {
        MongoUser user = userRepo.findFirstByEmail(email);

        LootboxCountDTO lootboxCountDTO = new LootboxCountDTO();
        lootboxCountDTO.setName(name);
        Integer value = user.getUserLootbox().getUnopened().get(name);
        lootboxCountDTO.setCount(Objects.requireNonNullElse(value, 0));

        return lootboxCountDTO;
    }

    public List<LootDTO> getNameHistory(String email, String name) {
        List<LootDTO> lootboxHistory = new ArrayList<>();

        MongoUser user = userRepo.findFirstByEmail(email);
        List<History> userHistory = user.getUserLootbox().getHistory();

        for(History h : userHistory) {
            lootboxHistory.add(new LootDTO(h));
        }

        return lootboxHistory;
    }
}
