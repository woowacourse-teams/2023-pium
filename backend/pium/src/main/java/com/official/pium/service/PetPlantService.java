package com.official.pium.service;

import com.official.pium.controller.dto.PetPlantRequest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.PetPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.PetPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class PetPlantService {

    private final PetPlantRepository petPlantRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;

    public void create(PetPlantRequest request, Member member) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(request.getDictionaryPlantId())
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id : " + request.getDictionaryPlantId()));

        PetPlant petPlant = PetPlantMapper.toPetPlant(request, dictionaryPlant, member);
        petPlantRepository.save(petPlant);
    }
}
