package com.official.pium.service;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.mapper.HistoryMapper;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.HistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final PetPlantRepository petPlantRepository;

    public HistoryResponse read(Long petPlantId, Pageable pageable, Member member, List<String> filters) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id :" + petPlantId));

        if (petPlant.isNotOwnerOf(member)) {
            throw new IllegalArgumentException("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. id :" + member.getId());
        }

        List<HistoryType> historyTypes = new ArrayList<>();

        if (filters != null) {
            historyTypes = filters.stream()
                    .map(HistoryType::from)
                    .toList();
        }

        Page<History> historyPageByPetPlantId = historyRepository.findAllByPetPlantIdAndHistoryTypes(petPlantId, historyTypes, pageable);

        return HistoryMapper.toHistoryResponse(historyPageByPetPlantId);
    }
}
