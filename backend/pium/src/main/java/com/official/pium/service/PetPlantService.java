package com.official.pium.service;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.PetPlantCreateRequest;
import com.official.pium.service.dto.PetPlantResponse;
import com.official.pium.service.dto.PetPlantUpdateRequest;
import com.official.pium.service.dto.SinglePetPlantResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PetPlantService {

    private final PetPlantRepository petPlantRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;

    @Transactional
    public PetPlantResponse create(PetPlantCreateRequest request, Member member) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(request.getDictionaryPlantId())
                .orElseThrow(
                        () -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id : " + request.getDictionaryPlantId()));

        PetPlant petPlant = PetPlantMapper.toPetPlant(request, dictionaryPlant, member);
        petPlantRepository.save(petPlant);

        long daySince = petPlant.calculateDaySince(LocalDate.now());
        long dDay = petPlant.calculateDDay(LocalDate.now());

        return PetPlantMapper.toPetPlantResponse(petPlant, dDay, daySince);
    }

    public PetPlantResponse read(Long id) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + id));

        Long dDay = petPlant.calculateDDay(LocalDate.now());
        Long daySince = petPlant.calculateDaySince(LocalDate.now());

        return PetPlantMapper.toPetPlantResponse(petPlant, dDay, daySince);
    }

    public DataResponse<List<SinglePetPlantResponse>> readAll(Member member) {
        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId());

        List<SinglePetPlantResponse> singlePetPlantResponses = petPlants.stream()
                .map(petPlant -> PetPlantMapper.toSinglePetPlantResponse(petPlant,
                        petPlant.calculateDaySince(LocalDate.now())))
                .toList();

        return DataResponse.<List<SinglePetPlantResponse>>builder().data(singlePetPlantResponses).build();
    }

    @Transactional
    public void update(Long id, PetPlantUpdateRequest updateRequest) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + id));

        petPlant.updatePetPlant(
                updateRequest.getNickname(), updateRequest.getLocation(),
                updateRequest.getFlowerpot(), updateRequest.getLight(),
                updateRequest.getWind(), updateRequest.getWaterCycle(),
                updateRequest.getBirthDate(), updateRequest.getLastWaterDate()
        );
    }
}
