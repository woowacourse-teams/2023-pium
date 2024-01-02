package com.official.pium.dictionaryPlant.repository;

import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DictionaryPlantRepository extends JpaRepository<DictionaryPlant, Long> {

    @Query("SELECT dp FROM DictionaryPlant dp WHERE dp.classification.name LIKE %:name%")
    List<DictionaryPlant> searchDictionaryPlantByName(@Param("name") String name);
}
