package com.official.pium.controller;

import com.official.pium.service.HistoryService;
import com.official.pium.service.dto.HistoryResponse;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/history")
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<HistoryResponse> read(
            @NotNull(message = "반려 식물 ID가 포함되어야 합니다.") @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") @RequestParam("petPlantId") Long petPlantId,
            @RequestParam Integer page,
            @RequestParam Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        HistoryResponse historyResponse = historyService.read(petPlantId, pageRequest);
        return ResponseEntity.ok(historyResponse);
    }

}
