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

    public static HistoryResponse toHistoryResponse(Page<History> petPlantHistory) {
        List<LocalDate> waterDates = petPlantHistory
                .map(History::getWaterDate)
                .toList();

        int currentPage = petPlantHistory.getPageable().getPageNumber() + 1;

        return HistoryResponse.builder()
                .page(currentPage)
                .size(petPlantHistory.getSize())
                .elementSize(petPlantHistory.getTotalElements())
                .hasNext(!petPlantHistory.isLast())
                .waterDateList(waterDates)
                .build();
    }
}
