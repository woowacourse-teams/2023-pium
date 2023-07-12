package com.official.pium.repository;

import com.official.pium.domain.PetPlant;
import org.springframework.data.jpa.repository.JpaRepository;

interface PetPlantRepository extends JpaRepository<PetPlant, Long> {
}
