package com.example.d1nque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.d1nque.services.CalculatorService;

import java.util.List;

@RestController
public class CalculatorController {

    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService){
        this.calculatorService = calculatorService;
    }

    @GetMapping("/math/examples")
    public List<String> getExamples(@RequestParam int count){
        return calculatorService.generateExamplesList(count);
    }

}