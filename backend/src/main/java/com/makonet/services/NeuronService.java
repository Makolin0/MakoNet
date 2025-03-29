package com.makonet.services;

import com.makonet.models.NumberRecognition;
import com.makonet.repository.NumberRecognitionDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NeuronService {
    private final NumberRecognitionDataRepository dataRepo;

    private List<List<Float>> neurons = new ArrayList<>();
    private final float learnConstant = 0.005f;
    private final int revisions = 30;


    public ResponseEntity<Boolean[]> guessDrawing(Boolean[] input) {
        if(neurons.isEmpty()) {
            train();
        }
        return ResponseEntity.ok().body(findDigit(input));
    }

    public ResponseEntity<String> train() {
        List<NumberRecognition> trainingData = dataRepo.findAll();

        // generating low starting weights for each neuron
        neurons.clear();
        for(int digit = 0; digit < 10; digit++) {
            List<Float> weights = new ArrayList<>();
            for (int i = 0; i < trainingData.getFirst().getDrawing().length; i++) {
                weights.add((float) (0.01 + Math.random() * 0.04));
            }
            neurons.add(weights);
        }


        // learning eras
        for(int era = 0; era < revisions; era++) {
            // for each training data
            for (NumberRecognition input : trainingData) {
                // changing random pixel
//                if(Math.random() > 0.95) {
//                    int rand = (int) (Math.random() * input.getDrawing().length);
//                    input.getDrawing()[rand] = !input.getDrawing()[rand];
//                }

                // summing weights on first training data
                Boolean[] result = findDigit(input.getDrawing());

                // checks if correct for every digit
                for(int digit = 0; digit < 10; digit++) {
                    // if guessed wrong
                    if ((input.getNumber() == digit) != (result[digit])) {
                        // updates weights
                        for (int i = 0; i < input.getDrawing().length; i++) {
                            neurons.get(digit).set(i, neurons.get(digit).get(i) + learnConstant * (input.getDrawing()[i] ? 1 : -1) * (input.getNumber() == digit ? 1 : -1));
                        }
                    }
                }
            }

            int errors = 0;
            for (NumberRecognition digit : trainingData) {
                // summing weights
                Boolean[] result = findDigit(digit.getDrawing());

                for(int i = 0; i < 10; i++){
                    if ((digit.getNumber() == i) != (result[i])) {
                        errors++;
                    }
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

    private Boolean[] findDigit(Boolean[] input) {
        Boolean[] result = new Boolean[10];

        for(int digit = 0; digit < 10; digit++) {
            float sum = 0;
            for (int i = 0; i < input.length; i++) {
                sum += neurons.get(digit).get(i) * (input[i] ? 1 : -1);
            }

            // activate function
            result[digit] = sum > 0;
        }

        return result;
    }
}
