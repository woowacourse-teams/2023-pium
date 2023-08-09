package com.official.pium.repository;

import com.official.pium.domain.DictionaryPlant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DictionaryPlantRepository extends JpaRepository<DictionaryPlant, Long> {

    List<DictionaryPlant> findDictionaryPlantsByNameContains(String name);
}
