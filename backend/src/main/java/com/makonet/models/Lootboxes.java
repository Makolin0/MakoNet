package com.makonet.models;

import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@ToString
public class Lootboxes {
    private Map<String, Integer> unopened;
    private List<History> history;

    public Lootboxes() {
        unopened = new HashMap<>();
        history = new ArrayList<>();
    }
}
