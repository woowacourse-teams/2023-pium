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
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DictionaryPlantService {

    private final DictionaryPlantRepository dictionaryPlantRepository;

    public DataResponse<List<DictionaryPlantSearchResponse>> search(String name) {
        List<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findDictionaryPlantsByNameContains(name);
        if (dictionaryPlants.isEmpty()) {
            throw new NoSuchElementException("검색에 해당하는 식물이 존재하지 않습니다. 검색어 : " + name);
        }
        List<DictionaryPlantSearchResponse> dictionaryPlantSearchResponses = dictionaryPlants.stream()
                .map(DictionaryPlantMapper::toDictionaryPlantSearchResponse)
                .toList();
        return DataResponse.<List<DictionaryPlantSearchResponse>>builder()
                .data(dictionaryPlantSearchResponses)
                .build();
    }
}
