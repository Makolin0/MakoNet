package com.makonet.controllers;

import com.makonet.dto.neuron.TrainNeuronDTO;
import com.makonet.models.NumberRecognition;
import com.makonet.services.NeuronService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/neuron")
public class NeuronController {
    private final NeuronService neuronService;

    @PostMapping("guess")
    public ResponseEntity<Boolean[]> guess(@RequestBody Boolean[] input) {
        return neuronService.guessDrawing(input);
    }

    @PostMapping("save")
    public ResponseEntity<String> save(@RequestBody NumberRecognition input) {
        return neuronService.populateData(input);
    }

    @GetMapping("save")
    public ResponseEntity<NumberRecognition[]> loadSaved(){
        return neuronService.getSaved();
    }

    @PostMapping("train")
    public ResponseEntity<String> train(@RequestBody TrainNeuronDTO input) {
        return neuronService.train(input);
    }
}
