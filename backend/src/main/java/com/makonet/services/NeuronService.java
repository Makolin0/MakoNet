package com.makonet.services;

import com.makonet.models.NumberRecognition;
import com.makonet.repository.NumberRecognitionDataRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NeuronService {
    private final NumberRecognitionDataRepository dataRepo;

    private List<List<Float>> neurons0 = new ArrayList<>();
    private float learnConstant = 0.03f;


    public ResponseEntity<Boolean> guessDrawing(Boolean[] input) {
        // summing weights
        float result = 0;
        for (int i = 0; i < input.length; i++) {
            result += neurons0.getFirst().get(i) * (input[i] ? 1 : -1);
        }

        // activate function
        Boolean is0 = result > 0;

        return ResponseEntity.ok().body(is0);
    }

    public ResponseEntity<String> train() {
        List<NumberRecognition> trainingData = dataRepo.findAll();

        // generating low starting weights
        neurons0.clear();
        List<Float> weights = new ArrayList<>();
        for(int i = 0; i < trainingData.getFirst().getDrawing().length; i++) {
            weights.add((float) (0.01 + Math.random() * 0.04));
        }
        neurons0.add(weights);


        for(int n = 0; n < 10; n++) {
            // for each training data
            for (NumberRecognition digit : trainingData) {
                // summing weights on first training data
                float result = 0;
                for (int i = 0; i < digit.getDrawing().length; i++) {
                    result += neurons0.getFirst().get(i) * (digit.getDrawing()[i] ? 1 : -1);
                }

                // activate function
                boolean is0 = result > 0;

                // checks if correct
                if ((digit.getNumber() == 0) != (is0)) {
                    for (int i = 0; i < digit.getDrawing().length; i++) {
                        // updates weights
                        neurons0.getFirst().set(i, neurons0.getFirst().get(i) + learnConstant * (digit.getDrawing()[i] ? 1 : -1) * (digit.getNumber() == 0 ? 1 : -1));
                    }
                }
            }

            int errors = 0;
            for (NumberRecognition digit : trainingData) {
                // summing weights
                float result = 0;
                for (int i = 0; i < digit.getDrawing().length; i++) {
                    result += neurons0.getFirst().get(i) * (digit.getDrawing()[i] ? 1 : -1);
                }

                // activate function
                boolean is0 = result > 0;

                if ((digit.getNumber() == 0) != (is0)) {
                    errors++;
                }
            }

            System.out.println("Errors: " + errors);
        }


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
