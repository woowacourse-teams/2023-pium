package com.official.pium.garden.repository;

import com.official.pium.garden.domain.Garden;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GardenCustomRepository {

    Page<Garden> findAllByDictionaryPlantIds(Pageable pageable, List<Long> dictionaryPlantIds);
}
