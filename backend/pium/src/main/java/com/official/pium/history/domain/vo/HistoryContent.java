package com.official.pium.history.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HistoryContent {

    @NotBlank
    @Column(name = "prev", nullable = false)
    private String previous;

    @NotBlank
    @Column(name = "curr", nullable = false)
    private String current;

    @Builder
    private HistoryContent(String previous, String current) {
        this.previous = previous;
        this.current = current;
    }
}
