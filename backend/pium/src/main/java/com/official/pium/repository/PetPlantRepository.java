package com.official.pium.repository;

import com.official.pium.domain.PetPlant;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetPlantRepository extends JpaRepository<PetPlant, Long> {

    List<PetPlant> findAllByMemberId(Long memberId);

    List<PetPlant> findAllByMemberId(Long memberId, Sort sort);
}
