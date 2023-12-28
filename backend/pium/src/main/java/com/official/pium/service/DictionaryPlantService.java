package com.official.pium.service;

import com.official.pium.domain.DictionaryPlant;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.repository.PetPlantRepository;
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
    private final PetPlantRepository petPlantRepository;

    public DictionaryPlantResponse read(Long id) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id: " + id));

        return DictionaryPlantResponse.from(dictionaryPlant);
    }

    public DataResponse<List<DictionaryPlantSearchResponse>> search(String name) {
        List<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findDictionaryPlantsByClassification_NameContains(
                name);

        List<DictionaryPlantSearchResponse> dictionaryPlantSearchResponses = dictionaryPlants.stream()
                .map(DictionaryPlantSearchResponse::from)
                .toList();

        return DataResponse.<List<DictionaryPlantSearchResponse>>builder()
                .data(dictionaryPlantSearchResponses)
                .build();
    }

    @Transactional
    public Long create(DictionaryPlantCreateRequest request) {
        DictionaryPlant dictionaryPlant = request.toDictionaryPlant();
        dictionaryPlantRepository.save(dictionaryPlant);
        return dictionaryPlant.getId();
    }

    @Transactional
    public void update(Long id, DictionaryPlantUpdateRequest request) {
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id: " + id));

        dictionaryPlant.updateDictionaryPlant(
                request.getImageUrl(),
                request.toClassification(),
                request.toProperty(),
                request.toCareDetail()
        );
    }

    @Transactional
    public void delete(Long id) {
        validatePetPlant(id);
        dictionaryPlantRepository.deleteById(id);
    }

    private void validatePetPlant(Long id) {
        if (petPlantRepository.existsByDictionaryPlantId(id)) {
            throw new IllegalArgumentException("해당 개체를 참조하는 반려 식물이 존재합니다 id: " + id);
        }
    }
}
