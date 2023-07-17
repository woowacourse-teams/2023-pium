package com.official.pium.service.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SinglePetPlantResponse {

    private Long id;
    private String nickname;
    private String imageUrl;
    private String dictionaryPlantName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private Long daySince;
}
