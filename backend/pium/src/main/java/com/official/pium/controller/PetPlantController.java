package com.official.pium.controller;

import com.official.pium.domain.Member;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.PetPlantRequest;
import com.official.pium.service.dto.PetPlantResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/pet-plants")
public class PetPlantController {

    private final PetPlantService petPlantService;

    @GetMapping("/{id}")
    public ResponseEntity<PetPlantResponse> read(
            @PathVariable
            @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long id) {
        PetPlantResponse petPlantResponse = petPlantService.read(id);
        return ResponseEntity.ok(petPlantResponse);
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid PetPlantRequest request, Member member) {
        PetPlantResponse petPlantResponse = petPlantService.create(request, member);
        return ResponseEntity.created(URI.create("/pet-plants/" + petPlantResponse.getId())).build();
    }
}
