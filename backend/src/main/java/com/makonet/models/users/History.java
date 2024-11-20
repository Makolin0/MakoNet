package com.makonet.models.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class History {
    private String rewardId;
    private LocalDateTime dropTime;
    private LocalDateTime receivedTime;
}
