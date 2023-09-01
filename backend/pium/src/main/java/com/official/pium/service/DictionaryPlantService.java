package com.official.pium.service;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.mapper.DictionaryPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantCreateRequest;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.service.dto.DictionaryPlantUpdateRequest;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DictionaryPlantService {

    private final DictionaryPlantRepository dictionaryPlantRepository;

    public DictionaryPlantResponse read(Long id) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id: " + id));

        return DictionaryPlantMapper.toDictionaryPlantResponse(dictionaryPlant);
    }

    public DataResponse<List<DictionaryPlantSearchResponse>> search(String name) {
        List<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findDictionaryPlantsByNameContains(name);

        List<DictionaryPlantSearchResponse> dictionaryPlantSearchResponses = dictionaryPlants.stream()
                .map(DictionaryPlantMapper::toDictionaryPlantSearchResponse)
                .toList();

        return DataResponse.<List<DictionaryPlantSearchResponse>>builder()
                .data(dictionaryPlantSearchResponses)
                .build();
    }

    @Transactional
    public void create(DictionaryPlantCreateRequest request) {
        DictionaryPlant dictionaryPlant = DictionaryPlantMapper.toDictionaryPlant(request);
        dictionaryPlantRepository.save(dictionaryPlant);
    }

    public void delete(Long id) {
        // TODO: ADMIN
        dictionaryPlantRepository.deleteById(id);
    }

    public void update(DictionaryPlantUpdateRequest request) {

    }
}
