package com.makonet.repository;

import com.makonet.models.users.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<MongoUser, String> {
    MongoUser findFirstByEmail(String email);
}
