package com.official.pium.service.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryResponse {

    private Integer page;
    private Integer size;
    private Long elementSize;
    private boolean hasNext;
    private List<LocalDate> waterDateList;
}
