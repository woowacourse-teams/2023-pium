package com.official.pium.service;

import com.official.pium.domain.History;
import com.official.pium.mapper.HistoryMapper;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.service.dto.HistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryResponse read(Long petPlantId, Pageable pageable) {
        Page<History> historyPageByPetPlantId = historyRepository.findAllByPetPlantId(petPlantId, pageable);

        return HistoryMapper.toHistoryResponse(historyPageByPetPlantId);
    }
}
