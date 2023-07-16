package com.official.pium.service;

import com.official.pium.controller.dto.PetPlantRequest;
import com.official.pium.controller.dto.PetPlantResponse;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.PetPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class PetPlantService {

    private final PetPlantRepository petPlantRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;

    public PetPlantResponse create(PetPlantRequest request, Member member) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(request.getDictionaryPlantId())
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id : " + request.getDictionaryPlantId()));

        PetPlant petPlant = PetPlantMapper.toPetPlant(request, dictionaryPlant, member);
        petPlantRepository.save(petPlant);

        long daySince = getDaySince(petPlant);
        long nextWaterDay = getNextWaterDay(petPlant);

        return PetPlantMapper.toPetPlantResponse(petPlant, nextWaterDay, daySince);
    }

    public PetPlantResponse read(Long id) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당 반려 식물이 존재하지 않습니다. id : " + id));

        long daySince = getDaySince(petPlant);
        long nextWaterDay = getNextWaterDay(petPlant);

        return PetPlantMapper.toPetPlantResponse(petPlant, nextWaterDay, daySince);
    }

    private long getNextWaterDay(PetPlant petPlant) {
        LocalDate nextWaterDate = getNextWaterDate(petPlant);
        return ChronoUnit.DAYS.between(LocalDate.now(), nextWaterDate);
    }

    private LocalDate getNextWaterDate(PetPlant petPlant) {
        return petPlant.getLastWaterDate().plusDays(petPlant.getWaterCycle());
    }

    private long getDaySince(PetPlant petPlant) {
        return ChronoUnit.DAYS.between(petPlant.getBirthDate(), LocalDate.now());
    }
}
