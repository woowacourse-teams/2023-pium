package com.official.pium.service;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.service.dto.GardenCreateRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class GardenServiceTest extends IntegrationTest {

    private Member member;
    private PetPlant petPlant;

    @Autowired
    private GardenService gardenService;

    @BeforeEach
    void setUp() {
        member = memberSupport.builder().build();
        petPlant = petPlantSupport.builder().build();
    }

    @Test
    void 모두의_정원_게시글_등록() {
        GardenCreateRequest request = GardenCreateRequest.builder()
                .petPlantId(petPlant.getId())
                .content("기영이가 많이 아픈 것 같습니다.")
                .manageLevel("초보자")
                .build();

        assertDoesNotThrow(
                () -> gardenService.create(request, petPlant.getMember())
        );
    }

    @Test
    void 존재하지_않는_반려_식물을_참조하면_예외_발생() {
        long wrongId = 0L;
        GardenCreateRequest request = GardenCreateRequest.builder()
                .petPlantId(wrongId)
                .content("기영이가 많이 아픈 것 같습니다.")
                .manageLevel("초보자")
                .build();

        Assertions.assertThatThrownBy(
                        () -> gardenService.create(request, petPlant.getMember())
                ).isInstanceOf(NoSuchElementException.class)
                .hasMessageContaining("반려 식물이 존재하지 않습니다. id: ");
    }

    @Test
    void 반려_식물_주인과_다른_사용자가_모두의_정원_게시글_등록_요청_시_예외_발생() {
        GardenCreateRequest request = GardenCreateRequest.builder()
                .petPlantId(petPlant.getId())
                .content("기영이가 많이 아픈 것 같습니다.")
                .manageLevel("초보자")
                .build();

        Assertions.assertThatThrownBy(
                        () -> gardenService.create(request, member)
                ).isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("요청 사용자와 반려 식물의 사용자가 일치하지 않습니다. memberId: ");
    }
}
