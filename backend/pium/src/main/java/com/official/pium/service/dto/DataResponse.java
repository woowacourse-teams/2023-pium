package com.official.pium.service.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DataResponse<T> {

    private List<T> data;

    public DataResponse(List<T> data) {
        this.data = data;
    }
}
