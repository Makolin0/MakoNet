package com.makonet.services;

import com.makonet.models.NumberRecognition;
import com.makonet.repository.NumberRecognitionDataRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NeuronService {
    private final NumberRecognitionDataRepository dataRepo;

    private Integer test = 0;


    public ResponseEntity<Integer[]> guessDrawing(Boolean[] input) {
        return ResponseEntity.ok().body(new Integer[] {test});
    }

    public ResponseEntity<String> train() {
        List<NumberRecognition> trainingData = dataRepo.findAll();

        test = 1;


        return ResponseEntity.ok().body("Success");
    }

    public ResponseEntity<String> populateData(NumberRecognition data) {
        dataRepo.save(data);
        return ResponseEntity.ok().body("Success");
    }

    public ResponseEntity<NumberRecognition[]> getSaved() {
        NumberRecognition[] data = dataRepo.findAll().toArray(new NumberRecognition[0]);
        return ResponseEntity.ok().body(data);
    }
}
