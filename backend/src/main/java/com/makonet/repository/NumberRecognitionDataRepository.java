package com.makonet.repository;

import com.makonet.models.NumberRecognition;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NumberRecognitionDataRepository extends MongoRepository<NumberRecognition, String> {
}
