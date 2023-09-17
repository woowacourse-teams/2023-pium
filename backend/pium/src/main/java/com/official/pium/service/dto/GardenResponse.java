package com.official.pium.service.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GardenResponse {

    private Integer page;
    private Integer size;
    private Long elementSize;
    private boolean hasNext;
    private List<SingleGardenResponse> data;
}
