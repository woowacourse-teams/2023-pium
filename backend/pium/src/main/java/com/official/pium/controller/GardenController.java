package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.service.GardenService;
import com.official.pium.service.dto.GardenCreateRequest;
import com.official.pium.service.dto.GardenResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/garden")
public class GardenController {

    private final GardenService gardenService;

    @PostMapping
    public ResponseEntity<Void> create(
            @RequestBody @Valid GardenCreateRequest request,
            @Auth Member member) {
        gardenService.create(request, member);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<GardenResponse> readAll(
            @PageableDefault(size = 20) Pageable pageable,
            @RequestParam(value = "filter", required = false) List<Long> filters) {
        GardenResponse gardenResponse = gardenService.readAll(pageable, filters);
        return ResponseEntity.ok(gardenResponse);
    }
}
