package com.official.pium.service;

import com.official.pium.domain.Admin;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.exception.NeedAdminException;
import com.official.pium.mapper.DictionaryPlantMapper;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.service.dto.DataResponse;
import com.official.pium.service.dto.DictionaryPlantCreateRequest;
import com.official.pium.service.dto.DictionaryPlantResponse;
import com.official.pium.service.dto.DictionaryPlantSearchResponse;
import com.official.pium.service.dto.DictionaryPlantUpdateRequest;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
    public void create(Admin admin, DictionaryPlantCreateRequest request) {
        validateAdmin(admin);
        DictionaryPlant dictionaryPlant = DictionaryPlantMapper.toDictionaryPlant(request);
        dictionaryPlantRepository.save(dictionaryPlant);
    }

    public void update(Admin admin, Long id, DictionaryPlantUpdateRequest request) {
        validateAdmin(admin);
        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("사전 식물이 존재하지 않습니다. id: "+ id));

        dictionaryPlant.updateDictionaryPlant(
                request.getName(),
                request.getImageUrl(),
                request.getFamilyName(),
                request.getSmell(),
                request.getPoison(),
                request.getManageLevel(),
                request.getGrowSpeed(),
                request.getRequireTemp(),
                request.getMinimumTemp(),
                request.getRequireHumidity(),
                request.getPostingPlace(),
                request.getSpecialManageInfo(),
                request.getSpring(),
                request.getSummer(),
                request.getAutumn(),
                request.getWinter()
        );
    }

    @Transactional
    public void delete(Admin admin, Long id) {
        validateAdmin(admin);
        dictionaryPlantRepository.deleteById(id);
    }


    private void validateAdmin(Admin admin) {
        if (admin == null) {
            throw new NeedAdminException("관리자 권한이 필요한 작업입니다.");
        }
    }
}
