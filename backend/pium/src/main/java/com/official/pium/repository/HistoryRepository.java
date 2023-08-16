package com.official.pium.repository;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long>, HistoryCustomRepository {

    Page<History> findAllByPetPlantId(Long petPlantId, Pageable pageable);

    Page<History> findAllByPetPlantIdAndHistoryCategoryHistoryType(Long petPlantId, HistoryType historyType, Pageable pageable);

    void deleteAllByPetPlantId(Long petPlantId);
}
