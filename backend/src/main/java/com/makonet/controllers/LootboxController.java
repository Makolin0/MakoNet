package com.makonet.controllers;

import com.makonet.dto.lootbox.LootDTO;
import com.makonet.dto.lootbox.LootboxDrawDTO;
import com.makonet.dto.lootbox.LootboxCountDTO;
import com.makonet.models.lootboxes.Lootbox;
import com.makonet.services.LootboxService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/lootbox")
public class LootboxController {
    private final LootboxService lootboxService;

    @GetMapping("/demo")
    public List<String> getAllNames() {
        return lootboxService.getNames();
    }

    @GetMapping
    public List<LootboxCountDTO> getLootboxCount(@AuthenticationPrincipal UserDetails userDetails) {
        return lootboxService.getLootboxCount(userDetails.getUsername());
    }

    @GetMapping("{name}")
    public Lootbox getLootboxData(@PathVariable String name) {
        return lootboxService.getInfo(name);
    }

    @PostMapping("{name}/demo")
    public LootboxDrawDTO demoLootbox(@PathVariable String name) {
        return lootboxService.drawDemo(name);
    }

    @PostMapping("{name}")
    public ResponseEntity<LootboxDrawDTO> drawLootbox(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String name) {
        try {
            return ResponseEntity.ok(lootboxService.draw(userDetails.getUsername(), name));
        } catch (IllegalAccessException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("{name}/count")
    public LootboxCountDTO getLootboxNameCount(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String name) {
        return lootboxService.getLootboxNameCount(userDetails.getUsername(), name);
    }

    @GetMapping("{name}/history")
    public List<LootDTO> getLootboxHistory(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String name) {
        return lootboxService.getNameHistory(userDetails.getUsername(), name);
    }
}
