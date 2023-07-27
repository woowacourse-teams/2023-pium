package com.official.pium.controller;

import com.official.pium.domain.Member;
import com.official.pium.service.ReminderService;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.service.dto.ReminderResponse;
import com.official.pium.service.dto.ReminderUpdateRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/reminders")
public class ReminderController {

    private final ReminderService reminderService;

    @PostMapping("/{petPlantId}")
    public ResponseEntity<Void> water(
            @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long petPlantId,
            @Valid @RequestBody ReminderCreateRequest reminderCreateRequest,
            Member member) {
        reminderService.water(reminderCreateRequest, petPlantId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{petPlantId}")
    public ResponseEntity<Void> delay(
            @PathVariable @Positive(message = "반려 식물 ID는 1이상의 값이어야 합니다.") Long petPlantId,
            @Valid @RequestBody ReminderUpdateRequest reminderUpdateRequest,
            Member member) {
        reminderService.delay(reminderUpdateRequest, petPlantId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<ReminderResponse>>> readAll(Member member) {
        DataResponse<List<ReminderResponse>> dataResponse = reminderService.readAll(member);
        return ResponseEntity.ok(dataResponse);
    }
}
