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
        return lootboxRepo.findAll().stream().map(Lootbox::getName).toList();
    }

    public Lootbox getInfo(String name) {
        return lootboxRepo.findFirstByName(name);
    }
}
