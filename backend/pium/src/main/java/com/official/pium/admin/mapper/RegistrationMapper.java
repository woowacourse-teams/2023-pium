package com.official.pium.admin.mapper;

import com.official.pium.admin.domain.Registration;
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

}
