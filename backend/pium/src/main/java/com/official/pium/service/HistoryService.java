package com.official.pium.service;

import com.official.pium.domain.History;
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

import java.util.NoSuchElementException;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final PetPlantRepository petPlantRepository;

    public HistoryResponse read(Long petPlantId, Pageable pageable, Member member) {
        PetPlant petPlant = petPlantRepository.findById(petPlantId)
                .orElseThrow(() -> new NoSuchElementException("id에 해당하는 반려식물이 없습니다"));

        if (petPlant.isNotOwnerOf(member)) {
            throw new IllegalArgumentException("다른 사용자의 반려식물을 조회할 수 없습니다");
        }

        Page<History> historyPageByPetPlantId = historyRepository.findAllByPetPlantId(petPlantId, pageable);

        return HistoryMapper.toHistoryResponse(historyPageByPetPlantId);
    }
}
