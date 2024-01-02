package com.official.pium.petPlant.repository;

import com.official.pium.petPlant.domain.PetPlant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetPlantRepository extends JpaRepository<PetPlant, Long>, PetPlantCustomRepository {

    @EntityGraph(attributePaths = {"dictionaryPlant"})
    Optional<PetPlant> findById(Long id);

    @EntityGraph(attributePaths = {"dictionaryPlant"})
    List<PetPlant> findAllByMemberId(Long memberId);

    @EntityGraph(attributePaths = {"dictionaryPlant"})
    List<PetPlant> findAllByMemberId(Long memberId, Sort sort);

    boolean existsByDictionaryPlantId(Long dictionaryPlantId);
}
