package com.official.pium.controller;

import com.official.pium.domain.Auth;
import com.official.pium.domain.Member;
import com.official.pium.mapper.HistoryMapper;
import com.official.pium.service.HistoryService;
import com.official.pium.service.dto.HistoryResponse;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
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
            @RequestParam @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long petPlantId,
            @RequestParam @Positive(message = "페이지는 1이상의 값이어야 합니다.") Integer page,
            @RequestParam @Positive(message = "페이지 크기는 1이상의 값이어야 합니다.") Integer size,
            @Auth Member member) {

        HistoryResponse historyResponse = historyService.read(petPlantId, HistoryMapper.toHistoryPageRequest(page, size), member);
        return ResponseEntity.ok(historyResponse);
    }

}
