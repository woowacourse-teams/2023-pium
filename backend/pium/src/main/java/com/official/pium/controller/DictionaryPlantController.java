package com.official.pium.controller;


import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/dictionary-plants")
public class DictionaryPlantController {

    private final DictionaryPlantService dictionaryPlantService;

    @GetMapping("/{id}")
    public ResponseEntity<DictionaryPlantResponse> read(
            @PathVariable @Positive(message = "사전 식물 ID는 1이상의 값이어야 합니다.") Long id) {
        DictionaryPlantResponse dictionaryPlantResponse = dictionaryPlantService.read(id);
        return ResponseEntity.ok(dictionaryPlantResponse);
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<DictionaryPlantSearchResponse>>> searchDictionaryPlants(
            @RequestParam @NotBlank(message = "검색어는 비어있을 수 없습니다.") String name) {
        DataResponse<List<DictionaryPlantSearchResponse>> dataResponse = dictionaryPlantService.search(name);
        return ResponseEntity.ok(dataResponse);
    }
}
