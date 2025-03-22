package com.makonet.services;

import com.makonet.models.NumberRecognition;
import com.makonet.repository.NumberRecognitionDataRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NeuronService {
    private NumberRecognitionDataRepository dataRepo;

    public ResponseEntity<Integer[]> guessDrawing(Boolean[] input) {
        return null;
    }

    public ResponseEntity<String> learn() {
        return null;
    }

    public ResponseEntity<String> populateData(NumberRecognition data) {
        dataRepo.save(data);
        return ResponseEntity.ok().body("Success");
    }
}
