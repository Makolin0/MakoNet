package com.makonet.controllers;

import com.makonet.dto.LootboxDrawDTO;
import com.makonet.models.lootboxes.Lootbox;
import com.makonet.services.LootboxService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("{name}/demo")
    public LootboxDrawDTO demoLootbox(@PathVariable String name) {
        return lootboxService.drawDemo(name);
    }

}
