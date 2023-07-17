package com.official.pium.service;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.SinglePetPlantResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PetPlantService {

    private final PetPlantRepository petPlantRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;

    @Transactional
    public PetPlantResponse create(PetPlantRequest request, Member member) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(request.getDictionaryPlantId())
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id : " + request.getDictionaryPlantId()));

        PetPlant petPlant = PetPlantMapper.toPetPlant(request, dictionaryPlant, member);
        petPlantRepository.save(petPlant);

        long daySince = getDaySince(petPlant);
        long nextWaterDay = getNextWaterDay(petPlant);

        return PetPlantMapper.toPetPlantResponse(petPlant, nextWaterDay, daySince);
    }

    public DataResponse<SinglePetPlantResponse> readAll(Member member) {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId());

        List<SinglePetPlantResponse> singlePetPlantResponses = petPlants.stream()
                .map(petPlant -> PetPlantMapper.toSinglePetPlantResponse(petPlant, getDaySince(petPlant)))
                .collect(Collectors.toList());

        return new DataResponse<>(singlePetPlantResponses);
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
