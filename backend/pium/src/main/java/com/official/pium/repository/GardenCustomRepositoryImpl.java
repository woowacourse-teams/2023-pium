package com.official.pium.repository;

import static com.official.pium.domain.QDictionaryPlant.dictionaryPlant;
import static com.official.pium.domain.QGarden.garden;
import static com.official.pium.domain.QMember.member;

import com.official.pium.domain.Garden;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GardenCustomRepositoryImpl implements GardenCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Garden> findAllByDictionaryPlantIds(Pageable pageable, List<Long> dictionaryPlantIds) {
        List<Garden> gardens = jpaQueryFactory.selectFrom(garden)
                .where(validateDictionaryPlantIds(dictionaryPlantIds))
                .orderBy(new OrderSpecifier<>(Order.DESC, garden.createdAt))
                .leftJoin(garden.dictionaryPlant, dictionaryPlant)
                .fetchJoin()
                .leftJoin(garden.member, member)
                .fetchJoin()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = jpaQueryFactory.select(garden.count())
                .from(garden)
                .where(validateDictionaryPlantIds(dictionaryPlantIds));

        return PageableExecutionUtils.getPage(gardens, pageable, countQuery::fetchOne);
    }

    private static BooleanExpression validateDictionaryPlantIds(List<Long> dictionaryPlantIds) {
        if (dictionaryPlantIds == null || dictionaryPlantIds.isEmpty()) {
            return null;
        }
        return garden.dictionaryPlant.id.in(dictionaryPlantIds);
    }
}
