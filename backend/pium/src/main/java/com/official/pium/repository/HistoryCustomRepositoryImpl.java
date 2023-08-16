package com.official.pium.repository;

import static com.official.pium.domain.QHistory.history;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryType;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HistoryCustomRepositoryImpl implements HistoryCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<History> findAllByPetPlantIdAndHistoryTypes(Long petPlantId, List<HistoryType> historyTypes,
                                                            Pageable pageable) {

        List<History> histories = jpaQueryFactory.selectFrom(history)
                .where(history.petPlant.id.eq(petPlantId), inHistoryType(historyTypes))
                .orderBy(new OrderSpecifier<>(Order.DESC, history.createdAt),
                        new OrderSpecifier<>(Order.DESC, history.date))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(histories, pageable, getCount(petPlantId, historyTypes));
    }

    private Long getCount(Long petPlantId, List<HistoryType> historyTypes) {
        return jpaQueryFactory.select(history.count())
                .from(history)
                .where(history.petPlant.id.eq(petPlantId), inHistoryType(historyTypes))
                .fetchOne();
    }

    private BooleanExpression inHistoryType(List<HistoryType> historyTypes) {
        if (historyTypes == null || historyTypes.isEmpty()) {
            return null;
        }

        return history.historyCategory.historyType.in(historyTypes);
    }
}
