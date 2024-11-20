package com.makonet.controllers;

import com.makonet.models.lootboxes.Lootbox;
import com.makonet.services.LootboxService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/lootbox")
public class LootboxController {
    private final LootboxService lootboxService;

    @GetMapping
    public List<String> getAllNames() {
        return lootboxService.getNames();
    }

    @GetMapping("{name}")
    public Lootbox getLootboxData(@PathVariable String name) {
        return lootboxService.getInfo(name);
    }


}
