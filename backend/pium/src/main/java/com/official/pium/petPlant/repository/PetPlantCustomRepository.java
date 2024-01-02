package com.official.pium.petPlant.repository;

import com.official.pium.member.domain.Member;
import com.official.pium.petPlant.domain.PetPlant;
import java.time.LocalDate;
import java.util.List;

public interface PetPlantCustomRepository {

    void deleteAllByMember(Member member);

    List<PetPlant> findAllByWaterNotification(LocalDate date);
}
