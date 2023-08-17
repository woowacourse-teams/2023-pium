package com.official.pium.repository;

import com.official.pium.domain.Member;

public interface PetPlantCustomRepository {

    void deleteAllByMember(Member member);
}
