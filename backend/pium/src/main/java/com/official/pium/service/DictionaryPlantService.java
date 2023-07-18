package com.official.pium.service;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.mapper.DictionaryPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DictionaryPlantService {

    private final DictionaryPlantRepository dictionaryPlantRepository;

    public DataResponse<List<DictionaryPlantSearchResponse>> search(String name) {
        List<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findDictionaryPlantsByNameContains(name);
        List<DictionaryPlantSearchResponse> dictionaryPlantSearchResponses = dictionaryPlants.stream()
                .map(DictionaryPlantMapper::toDictionaryPlantSearchResponse)
                .toList();
        return DataResponse.<List<DictionaryPlantSearchResponse>>builder()
                .data(dictionaryPlantSearchResponses)
                .build();
    }
}
