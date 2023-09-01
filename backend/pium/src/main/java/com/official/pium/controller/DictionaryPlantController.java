package com.official.pium.controller;


import com.official.pium.annotation.AdminAuth;
import com.official.pium.domain.Admin;
import com.official.pium.service.DictionaryPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantCreateRequest;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.service.dto.DictionaryPlantUpdateRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import javax.naming.AuthenticationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public ResponseEntity<Void> write(@AdminAuth Admin admin, @RequestBody DictionaryPlantCreateRequest request) {
        dictionaryPlantService.create(admin, request);
        return ResponseEntity.created(URI.create("")).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@AdminAuth Admin admin, @PathVariable Long id, @RequestBody DictionaryPlantUpdateRequest request) {
        dictionaryPlantService.update(admin, id, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AdminAuth Admin admin, @PathVariable Long id) {
        dictionaryPlantService.delete(admin, id);
        return ResponseEntity.noContent().build();
    }
}
