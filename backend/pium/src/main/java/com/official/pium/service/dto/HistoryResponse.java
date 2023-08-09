package com.official.pium.service.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
}
