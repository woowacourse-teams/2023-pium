package com.official.pium.service;

import com.official.pium.domain.Garden;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.domain.vo.GardenPlantState;
import com.official.pium.repository.GardenRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.GardenCreateRequest;
import com.official.pium.service.dto.GardenResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GardenService {

    private final GardenRepository gardenRepository;
    private final PetPlantRepository petPlantRepository;

    @Transactional
    public void create(GardenCreateRequest request, Member member) {
        PetPlant petPlant = petPlantRepository.findById(request.getPetPlantId())
                .orElseThrow(() -> new NoSuchElementException("반려 식물이 존재하지 않습니다. id: " + request.getPetPlantId()));
        checkOwner(petPlant, member);
        Garden garden = createGarden(petPlant, request);
        gardenRepository.save(garden);
    }

    private Garden createGarden(PetPlant petPlant, GardenCreateRequest request) {
        return Garden.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(petPlant.getMember())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .gardenPlantState(toPlantState(petPlant))
                .daySince(petPlant.calculateDaySince(LocalDate.now()))
                .waterCycle(petPlant.getWaterCycle())
                .content(request.getContent())
                .manageLevel(request.getManageLevel())
                .build();
    }

    private static GardenPlantState toPlantState(PetPlant petPlant) {
        return GardenPlantState.builder()
                .location(petPlant.getPetPlantState().getLocation())
                .flowerpot(petPlant.getPetPlantState().getFlowerpot())
                .light(petPlant.getPetPlantState().getLight())
                .wind(petPlant.getPetPlantState().getWind())
                .build();
    }

    private void checkOwner(PetPlant petPlant, Member member) {
        if (petPlant.isNotOwnerOf(member)) {
            throw new IllegalArgumentException("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + member.getId());
        }
    }

    public GardenResponse readAll(Pageable pageable, List<Long> filters) {
        Page<Garden> gardens = gardenRepository.findAllByDictionaryPlantIds(pageable, filters);
        return GardenResponse.from(gardens);
    }
}
