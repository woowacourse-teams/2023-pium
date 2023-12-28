package com.official.pium.service.dto;

import com.official.pium.domain.Garden;
import java.util.List;
import java.util.stream.Collectors;
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
public class GardenResponse {

    private Integer page;
    private Integer size;
    private Long elementSize;
    private boolean hasNext;
    private List<SingleGardenResponse> data;

    public static GardenResponse from(Page<Garden> gardens) {
        return GardenResponse.builder()
                .page(gardens.getPageable().getPageNumber())
                .size(gardens.getSize())
                .elementSize(gardens.getTotalElements())
                .hasNext(gardens.hasNext())
                .data(gardens.getContent().stream()
                        .map(SingleGardenResponse::from)
                        .collect(Collectors.toList())
                ).build();
    }

}
