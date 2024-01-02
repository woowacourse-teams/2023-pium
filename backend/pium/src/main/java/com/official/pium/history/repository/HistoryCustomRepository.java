package com.official.pium.history.repository;

import com.official.pium.history.domain.History;
import com.official.pium.history.domain.HistoryType;
import com.official.pium.petPlant.domain.PetPlant;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HistoryCustomRepository {

    Page<History> findAllByPetPlantIdAndHistoryTypes(Long petPlantId, List<HistoryType> historyTypes,
                                                     Pageable pageable);

    void deleteAllByPetPlants(List<PetPlant> petPlants);

    void deleteAllByPetPlantId(Long petPlantId);
}
