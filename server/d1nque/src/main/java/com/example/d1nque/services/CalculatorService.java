package com.example.d1nque.services;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class CalculatorService {
    private static final List<String> operators = List.of(new String[]{"-", "+", "/", "x"});
    public List<String> generateExamplesList(int count) {
        List<String> listOfExamples = new ArrayList<>();

        for (int i = 0; i < count; i++){
            listOfExamples.add(generateExample());
        }

        return listOfExamples;
    }

    public static String generateExample(){
        Random rand = new Random();
        return rand.nextInt(100) + operators.get(rand.nextInt(operators.size())) + rand.nextInt(100);
    }
}