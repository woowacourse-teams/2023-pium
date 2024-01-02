package com.official.pium.history.application.dto;

import com.official.pium.history.domain.History;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryResponse {

    private Integer page;
    private Integer size;
    private Long elementSize;
    private boolean hasNext;
    private List<SingleHistoryResponse> data;

    public static HistoryResponse from(Page<History> petPlantHistory) {
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
        return histories.stream()
                .map(SingleHistoryResponse::from)
                .toList();
    }
}
