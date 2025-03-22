package com.makonet.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "numberRecognitionData")
@ToString
public class NumberRecognition {
    Boolean[] drawing;
    Integer number;
}
