package com.official.pium.repository;

import com.official.pium.domain.PetPlant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetPlantRepository extends JpaRepository<PetPlant, Long> {
    List<PetPlant> findAllByMemberId(Long id);
}
