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
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
public class PetPlantController {

    private final PetPlantService petPlantService;

    @GetMapping("/pet-plants/{petPlantId}")
    public ResponseEntity<PetPlantResponse> read(
            @PathVariable
            @Positive(message = "반려식물 ID는 음수가 될 수 없습니다.") Long petPlantId) {
        PetPlantResponse petPlantResponse = petPlantService.read(petPlantId);
        return ResponseEntity.ok(petPlantResponse);
    }

    @PostMapping("/pet-plants")
    public ResponseEntity<Void> create(@RequestBody @Valid PetPlantRequest request, Member member) {
        PetPlantResponse petPlantResponse = petPlantService.create(request, member);
        return ResponseEntity.created(URI.create("/pet-plants/" + petPlantResponse.getId())).build();
    }
}
