package com.official.pium.repository;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HistoryCustomRepository {

    Page<History> findAllByPetPlantIdAndHistoryTypes(Long petPlantId, List<HistoryType> historyTypes, Pageable pageable);
}
