package com.official.pium.repository;

import static com.official.pium.domain.QPetPlant.petPlant;

import com.official.pium.domain.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PetPlantCustomRepositoryImpl implements PetPlantCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllByMember(Member member) {
        jpaQueryFactory.delete(petPlant)
                .where(petPlant.member.eq(member))
                .execute();
    }
}
