package com.official.pium.repository;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.PetPlant;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HistoryCustomRepository {

    Page<History> findAllByPetPlantIdAndHistoryTypes(Long petPlantId, List<HistoryType> historyTypes,
                                                     Pageable pageable);

    void deleteAllByPetPlants(List<PetPlant> petPlants);
}
