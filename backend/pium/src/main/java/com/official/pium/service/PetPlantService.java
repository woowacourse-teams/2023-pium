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
import java.util.List;
import java.util.NoSuchElementException;

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

        long daySince = petPlant.calculateDaySince(LocalDate.now());
        long nextWaterDay = petPlant.calculateDDay(LocalDate.now());

        return PetPlantMapper.toPetPlantResponse(petPlant, nextWaterDay, daySince);
    }

    public PetPlantResponse read(Long id) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + id));

        Long nextWaterDay = petPlant.calculateDDay(LocalDate.now());
        Long daySince = petPlant.calculateDaySince(LocalDate.now());

        return PetPlantMapper.toPetPlantResponse(petPlant, nextWaterDay, daySince);
    }

    public DataResponse<List<SinglePetPlantResponse>> readAll(Member member) {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId());

        List<SinglePetPlantResponse> singlePetPlantResponses = petPlants.stream()
                .map(petPlant -> PetPlantMapper.toSinglePetPlantResponse(petPlant, petPlant.calculateDaySince(LocalDate.now())))
                .toList();

        return DataResponse.<List<SinglePetPlantResponse>>builder().data(singlePetPlantResponses).build();
    }
}
