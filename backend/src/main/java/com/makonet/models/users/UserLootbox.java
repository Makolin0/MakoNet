package com.makonet.models.users;

import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@ToString
public class UserLootbox {
    private Map<String, Integer> unopened;
    private List<History> history;

    public UserLootbox() {
        unopened = new HashMap<>();
        history = new ArrayList<>();
    }
}
