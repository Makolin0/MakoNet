package com.makonet.controllers;

import com.makonet.services.NeuronService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/neuron")
public class NeuronController {
    private final NeuronService neuronService;

    @GetMapping("guess")
    public ResponseEntity<Integer[]> guess(@RequestBody Integer[] input) {
        return neuronService.guessDrawing(input);
    }
}
