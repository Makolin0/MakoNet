package com.makonet.repository;

import com.makonet.models.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<MongoUser, String> {
    MongoUser findByUsername(String username);
}
