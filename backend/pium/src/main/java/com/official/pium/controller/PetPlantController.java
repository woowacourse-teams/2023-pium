package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.service.PetPlantService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.service.dto.SinglePetPlantResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/pet-plants")
public class PetPlantController {

    private final PetPlantService petPlantService;

    @GetMapping("/{id}")
    public ResponseEntity<PetPlantResponse> read(
        @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long id,
        @Auth Member member
    ) {
        PetPlantResponse petPlantResponse = petPlantService.read(id, member);
        return ResponseEntity.ok(petPlantResponse);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> create(
        @RequestPart(name = "request") @Valid PetPlantCreateRequest request,
        @RequestPart(name = "image", required = false) MultipartFile multipartFile,
        @Auth Member member
    ) {
        PetPlantResponse petPlantResponse = petPlantService.create(request, multipartFile, member);
        return ResponseEntity.created(URI.create("/pet-plants/" + petPlantResponse.getId())).build();
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<SinglePetPlantResponse>>> readAll(@Auth Member member) {
        DataResponse<List<SinglePetPlantResponse>> response = petPlantService.readAll(member);
        return ResponseEntity.ok(response);
    }

    @PatchMapping(path = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> update(
        @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long id,
        @RequestPart(name = "request") @Valid PetPlantUpdateRequest petPlantUpdateRequest,
        @RequestPart(name = "image", required = false) MultipartFile multipartFile,
        @Auth Member member
    ) {
        petPlantService.update(id, petPlantUpdateRequest, multipartFile, member);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
        @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long id,
        @Auth Member member
    ) {
        petPlantService.delete(id, member);
        return ResponseEntity.noContent().build();
    }
}
