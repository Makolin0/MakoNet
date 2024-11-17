package com.makonet.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
@ToString
public class MongoUser {
    private String username;
    private String email;
    private String password;
    private String registrationTime;
    private String[] roles;
    private Lootboxes lootboxes;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
class Lootboxes {
    private Map<String, Integer> unopened;
    private History[] history;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
class History {
    private String rewardId;
    private LocalDateTime dropTime;
    private LocalDateTime receivedTime;
}