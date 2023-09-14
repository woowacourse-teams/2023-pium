package com.official.pium.repository;

import com.official.pium.domain.Garden;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GardenRepository extends JpaRepository<Garden, Long> {
}
