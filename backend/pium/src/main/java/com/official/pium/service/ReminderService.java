package com.official.pium.service;

import com.official.pium.domain.History;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.ReminderCreateRequest;
import com.official.pium.service.dto.ReminderResponse;
import com.official.pium.service.dto.ReminderUpdateRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReminderService {

    private final PetPlantRepository petPlantRepository;
    private final HistoryRepository historyRepository;

    @Transactional
    public void water(ReminderCreateRequest reminderCreateRequest, Long petPlantId) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + petPlantId));

        petPlant.water(reminderCreateRequest.getWaterDate());

        History history = History.builder()
                .petPlant(petPlant)
                .waterDate(reminderCreateRequest.getWaterDate())
                .build();

        historyRepository.save(history);
    }

    @Transactional
    public void delay(ReminderUpdateRequest reminderUpdateRequest, Long petPlantId) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + petPlantId));

        petPlant.delay(reminderUpdateRequest.getNextWaterDate());
    }

    public DataResponse<List<ReminderResponse>> readAll(Member member) {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId());

        List<ReminderResponse> reminderResponses = petPlants.stream()
                .map(petPlant -> PetPlantMapper.toReminderResponse(
                        petPlant,
                        petPlant.calculateDDay(LocalDate.now())))
                .toList();

        return DataResponse.<List<ReminderResponse>>builder()
                .data(reminderResponses)
                .build();
    }
}
