package com.official.pium.mapper;

import com.official.pium.domain.History;
import com.official.pium.service.dto.HistoryResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryMapper {

    public static HistoryResponse toHistoryResponse(Page<History> historyPageByPetPlantId, boolean isLastPage) {
        List<LocalDate> waterDates = historyPageByPetPlantId
                .map(History::getWaterDate)
                .toList();

        int nowPage = historyPageByPetPlantId.getPageable().getPageNumber() + 1;

        return HistoryResponse.builder()
                .page(nowPage)
                .size(historyPageByPetPlantId.getSize())
                .elementSize(historyPageByPetPlantId.getTotalElements())
                .hasNext(isLastPage)
                .waterDateList(waterDates)
                .build();
    }
}
