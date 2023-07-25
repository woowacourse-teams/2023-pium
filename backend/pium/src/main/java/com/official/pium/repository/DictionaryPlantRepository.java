package com.official.pium.repository;

import com.official.pium.domain.DictionaryPlant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DictionaryPlantRepository extends JpaRepository<DictionaryPlant, Long> {

    List<DictionaryPlant> findDictionaryPlantsByNameContains(String name);
}
