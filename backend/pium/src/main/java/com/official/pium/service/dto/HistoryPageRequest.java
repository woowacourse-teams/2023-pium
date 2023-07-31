package com.official.pium.service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HistoryPageRequest {

    @NotNull
    @Positive(message = "페이지는 1이상의 값이어야 합니다.")
    private Integer page;
    @NotNull
    @Positive(message = "페이지 크기는 1이상의 값이어야 합니다.")
    private Integer size;

}
