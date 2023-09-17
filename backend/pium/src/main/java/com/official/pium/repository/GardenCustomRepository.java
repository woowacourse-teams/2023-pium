package com.official.pium.repository;

import com.official.pium.domain.Garden;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GardenCustomRepository {

    Page<Garden> findAllByDictionaryPlantIds(Pageable pageable, List<Long> dictionaryPlantIds);
}
