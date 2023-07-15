package com.official.pium.controller;

import com.official.pium.controller.dto.PetPlantRequest;
import com.official.pium.domain.Member;
import com.official.pium.service.PetPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class PetPlantController {

    private final PetPlantService petPlantService;

    @PostMapping("/pet-plant")
    public ResponseEntity<Void> create(PetPlantRequest request, Member member) {
        petPlantService.create(request, member);
        return ResponseEntity.created(URI.create("/")).build();
    }
}
