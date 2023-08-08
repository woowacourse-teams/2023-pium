package com.official.pium.service;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.HistoryRepository;
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
    private final HistoryRepository historyRepository;

    @Transactional
    public PetPlantResponse create(PetPlantCreateRequest request, Member member) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(request.getDictionaryPlantId())
                .orElseThrow(
                        () -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id: " + request.getDictionaryPlantId()));

        PetPlant petPlant = PetPlantMapper.toPetPlant(request, dictionaryPlant, member);
        petPlantRepository.save(petPlant);

        long daySince = petPlant.calculateDaySince(LocalDate.now());
        long dday = petPlant.calculateDday(LocalDate.now());

        return PetPlantMapper.toPetPlantResponse(petPlant, dday, daySince);
    }

    public PetPlantResponse read(Long id, Member member) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + id));

        checkOwner(petPlant, member);

        Long dday = petPlant.calculateDday(LocalDate.now());
        Long daySince = petPlant.calculateDaySince(LocalDate.now());

        return PetPlantMapper.toPetPlantResponse(petPlant, dday, daySince);
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
    public void update(Long id, PetPlantUpdateRequest updateRequest, Member member) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + id));

        checkOwner(petPlant, member);

        petPlant.updatePetPlant(
                updateRequest.getNickname(), updateRequest.getLocation(),
                updateRequest.getFlowerpot(), updateRequest.getLight(),
                updateRequest.getWind(), updateRequest.getWaterCycle(),
                updateRequest.getBirthDate(), updateRequest.getLastWaterDate()
        );
    }

    @Transactional
    public void delete(Long id, Member member) {
        PetPlant petPlant = petPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + id));

        checkOwner(petPlant, member);

        historyRepository.deleteAllByPetPlantId(petPlant.getId());
        petPlantRepository.delete(petPlant);
    }

    private void checkOwner(PetPlant petPlant, Member member) {
        if (petPlant.isNotOwnerOf(member)) {
            throw new IllegalArgumentException("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: " + member.getId());
        }
    }
}
