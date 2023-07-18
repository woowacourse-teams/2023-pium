package com.official.pium.controller;

import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.service.DictionaryPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dictionary-plants")
public class DictionaryPlantController {

    private final DictionaryPlantService dictionaryPlantService;

    @GetMapping
    public ResponseEntity<DataResponse<List<DictionaryPlantSearchResponse>>> searchDictionaryPlants(@RequestParam("name") String name) {
        return ResponseEntity.ok(dictionaryPlantService.search(name));
    }
}
