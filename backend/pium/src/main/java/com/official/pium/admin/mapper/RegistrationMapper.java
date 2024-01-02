package com.official.pium.admin.mapper;

import com.official.pium.admin.domain.Registration;
import com.official.pium.admin.service.dto.RegistrationResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RegistrationMapper {

    public static Registration toRegistration(String plantName, String imageUrl) {
        return Registration.builder()
                .plantName(plantName)
                .imageUrl(imageUrl)
                .build();
    }

    public static RegistrationResponse toResponse(Registration registration) {
        return RegistrationResponse.builder()
                .name(registration.getPlantName())
                .imageUrl(registration.getImageUrl())
                .build();
    }
}
