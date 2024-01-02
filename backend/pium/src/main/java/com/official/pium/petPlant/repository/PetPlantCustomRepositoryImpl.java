package com.official.pium.petPlant.repository;

import static com.official.pium.member.domain.QMember.member;
import static com.official.pium.petPlant.domain.QPetPlant.petPlant;

import com.official.pium.member.domain.Member;
import com.official.pium.petPlant.domain.PetPlant;
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
                .join(petPlant.member, member)
                .fetchJoin()
                .where(petPlant.waterDetail.nextWaterDate.eq(date), member.deviceToken.isNotNull())
                .fetch();
    }
}
