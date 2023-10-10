package com.official.pium.repository;

import static com.official.pium.domain.QMember.member;
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
    public List<PetPlant> findAllByWaterNotification(LocalDate date) {
        return jpaQueryFactory.select(petPlant)
                .from(petPlant)
                .join(member, petPlant.member)
                .fetchJoin()
                .where(petPlant.nextWaterDate.eq(date), member.deviceToken.isNotNull())
                .fetch();
    }
}
