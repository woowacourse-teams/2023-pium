package com.official.pium.mapper;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryContent;
import com.official.pium.service.dto.HistoryResponse;
import com.official.pium.service.dto.SingleHistoryResponse;
import com.official.pium.service.dto.SingleHistoryResponse.Content;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryMapper {

    public static HistoryResponse toHistoryResponse(Page<History> petPlantHistory) {
        List<History> histories = petPlantHistory.getContent();

        return HistoryResponse.builder()
                .page(petPlantHistory.getPageable().getPageNumber())
                .size(petPlantHistory.getSize())
                .elementSize(petPlantHistory.getTotalElements())
                .hasNext(!petPlantHistory.isLast())
                .data(getData(histories))
                .build();
    }

    private static List<SingleHistoryResponse> getData(List<History> histories) {
        List<SingleHistoryResponse> singleHistoryResponses = new ArrayList<>();
        for (History history : histories) {
            LocalDate date = history.getDate();
            String type = history.getHistoryCategory().getHistoryType().getType();
            HistoryContent historyContent = history.getHistoryContent();
            String previous = historyContent.getPrevious();
            String current = historyContent.getCurrent();
            SingleHistoryResponse singleHistoryResponse = SingleHistoryResponse.builder()
                    .type(type)
                    .date(date)
                    .content(Content.builder()
                            .previous(previous)
                            .current(current)
                            .build())
                    .build();
            singleHistoryResponses.add(singleHistoryResponse);
        }

        return singleHistoryResponses;
    }
}
