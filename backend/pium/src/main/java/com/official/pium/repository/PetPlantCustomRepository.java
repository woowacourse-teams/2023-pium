package com.official.pium.repository;

import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import java.time.LocalDate;
import java.util.List;

public interface PetPlantCustomRepository {

    void deleteAllByMember(Member member);

    List<PetPlant> findAllByWaterNotification(LocalDate date);
}
