package com.official.pium.repository;

import static com.official.pium.domain.QPetPlant.petPlant;

import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
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

    @Override
    public List<PetPlant> findAllByNextWaterDate(LocalDate date) {
        return jpaQueryFactory.select(petPlant)
                .from(petPlant)
                .where(petPlant.nextWaterDate.eq(date))
                .fetchJoin()
                .fetch();
    }
}
