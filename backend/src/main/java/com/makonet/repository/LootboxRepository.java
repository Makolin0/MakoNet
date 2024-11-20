package com.makonet.repository;

import com.makonet.models.lootboxes.Lootbox;
import com.makonet.models.users.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LootboxRepository extends MongoRepository<Lootbox, String> {
    Lootbox findFirstByName(String name);
}
