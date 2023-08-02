package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/pet-plants")
public class PetPlantController {

    private final PetPlantService petPlantService;

    @GetMapping("/{id}")
    public ResponseEntity<PetPlantResponse> read(
            @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long id,
            @Auth Member member) {
        PetPlantResponse petPlantResponse = petPlantService.read(id, member);
        return ResponseEntity.ok(petPlantResponse);
    }

    @PostMapping
    public ResponseEntity<Void> create(
            @RequestBody @Valid PetPlantCreateRequest request,
            @Auth Member member) {
        PetPlantResponse petPlantResponse = petPlantService.create(request, member);
        return ResponseEntity.created(URI.create("/pet-plants/" + petPlantResponse.getId())).build();
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<SinglePetPlantResponse>>> readAll(
            @Auth Member member) {
        DataResponse<List<SinglePetPlantResponse>> response = petPlantService.readAll(member);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long id,
            @RequestBody @Valid PetPlantUpdateRequest petPlantUpdateRequest,
            @Auth Member member) {
        petPlantService.update(id, petPlantUpdateRequest, member);
        return ResponseEntity.ok().build();
    }
}
