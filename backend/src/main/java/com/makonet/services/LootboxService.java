package com.makonet.services;

import com.makonet.models.lootboxes.Lootbox;
import com.makonet.repository.LootboxRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LootboxService {
    private final LootboxRepository lootboxRepo;

    public List<String> getNames() {
        lootboxRepo.findAll().forEach(System.out::println);
        List<String> lootboxNames = lootboxRepo.findAll().stream().map(Lootbox::getName).toList();
        System.out.println(lootboxNames);
        return lootboxNames;
    }
}
