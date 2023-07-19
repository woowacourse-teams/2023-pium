package com.official.pium.controller;


import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/dictionary-plants")
public class DictionaryPlantController {

    private final DictionaryPlantService dictionaryPlantService;

    @GetMapping("/{id}")
    public ResponseEntity<DictionaryPlantResponse> read(@PathVariable
                                                        @Positive(message = "사전 식물 ID는 1이상의 값이어야 합니다.")
                                                        Long id) {
        DictionaryPlantResponse dictionaryPlantResponse = dictionaryPlantService.read(id);
        return ResponseEntity.ok().body(dictionaryPlantResponse);
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<DictionaryPlantSearchResponse>>> searchDictionaryPlants(
            @RequestParam("name") String name) {
        return ResponseEntity.ok(dictionaryPlantService.search(name));
    }
}
