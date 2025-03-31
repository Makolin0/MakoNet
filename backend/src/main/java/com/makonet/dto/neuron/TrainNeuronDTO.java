package com.makonet.dto.neuron;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainNeuronDTO {
    private Integer epoch;
    private Double learningRate;
    private Double randomChance;
    private Integer randomPixels;
}
