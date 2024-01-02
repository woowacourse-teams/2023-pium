package com.official.pium.history.repository;

import com.official.pium.history.domain.History;
import com.official.pium.history.domain.HistoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long>, HistoryCustomRepository {

    Page<History> findAllByPetPlantId(Long petPlantId, Pageable pageable);

    Slice<History> findAllByPetPlantIdAndHistoryCategoryHistoryType(Long petPlantId, HistoryType historyType,
                                                                    Pageable pageable);
}
