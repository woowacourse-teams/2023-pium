package com.official.pium.controller;

import com.official.pium.domain.Member;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class PetPlantController {

    private final PetPlantService petPlantService;

    @PostMapping("/pet-plants")
    public ResponseEntity<Void> create(@RequestBody @Valid PetPlantRequest request, Member member) {
        PetPlantResponse petPlantResponse = petPlantService.create(request, member);
        return ResponseEntity.created(URI.create("/pet-plants/" + petPlantResponse.getId())).build();
    }

    @GetMapping("/pet-plants")
    public ResponseEntity<DataResponse<SinglePetPlantResponse>> readAll(Member member) {
        DataResponse<SinglePetPlantResponse> response = petPlantService.readAll(member);
        return ResponseEntity.ok(response);
    }
}
