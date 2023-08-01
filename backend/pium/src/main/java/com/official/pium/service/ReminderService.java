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
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReminderService {

    private final PetPlantRepository petPlantRepository;
    private final HistoryRepository historyRepository;

    @Transactional
    public void water(ReminderCreateRequest reminderCreateRequest, Long petPlantId, Member member) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + petPlantId));
        checkOwner(petPlant, member);

        petPlant.water(reminderCreateRequest.getWaterDate());

        History history = History.builder()
                .petPlant(petPlant)
                .waterDate(reminderCreateRequest.getWaterDate())
                .build();

        historyRepository.save(history);
    }

    @Transactional
    public void updateNextWaterDate(ReminderUpdateRequest reminderUpdateRequest, Long petPlantId, Member member) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + petPlantId));
        checkOwner(petPlant, member);

        petPlant.changeNextWaterDate(reminderUpdateRequest.getNextWaterDate());
    }

    private void checkOwner(PetPlant petPlant, Member member) {
        if (petPlant.isNotOwnerOf(member)) {
            throw new IllegalArgumentException("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + member.getId());
        }
    }

    public DataResponse<List<ReminderResponse>> readAll(Member member) {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId(), Sort.by(Direction.DESC, "nextWaterDate"));

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
