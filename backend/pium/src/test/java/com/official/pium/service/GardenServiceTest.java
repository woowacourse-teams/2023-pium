package com.official.pium.service;

import com.official.pium.IntegrationTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Garden;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.GardenRepository;
import com.official.pium.service.dto.GardenCreateRequest;
import com.official.pium.service.dto.GardenResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.LongStream;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class GardenServiceTest extends IntegrationTest {

    private Member member;
    private PetPlant petPlant;

    @Autowired
    private GardenService gardenService;

    @Autowired
    private GardenRepository gardenRepository;

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

        gardenService.create(request, petPlant.getMember());

        List<Garden> gardens = gardenRepository.findAll();
        Garden garden = gardens.get(0);

        assertSoftly(
                softly -> {
                    softly.assertThat(garden.getId()).isNotNull();
                    softly.assertThat(garden.getContent()).isEqualTo(request.getContent());
                    softly.assertThat(garden.getManageLevel()).isEqualTo(request.getManageLevel());
                    softly.assertThat(garden.getDictionaryPlant().getId()).isEqualTo(petPlant.getDictionaryPlant().getId());
                }
        );
    }

    @Test
    void 존재_하지_않는_반려_식물로_게시글_등록_요청시_예외_발생() {
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

    @Test
    void 정원_게시글_전체_조회() {
        LongStream.rangeClosed(1, 10)
                .forEach(i -> gardenSupport.builder()
                        .member(memberSupport.builder().kakaoId(i).build())
                        .build());

        Pageable pageable = PageRequest.of(4, 2);
        List<Long> filters = new ArrayList<>();

        GardenResponse gardenResponse = gardenService.readAll(pageable, filters);

        assertSoftly(
                softly -> {
                    softly.assertThat(gardenResponse.getElementSize()).isEqualTo(10);
                    softly.assertThat(gardenResponse.isHasNext()).isEqualTo(false);
                    softly.assertThat(gardenResponse.getSize()).isEqualTo(2);
                    softly.assertThat(gardenResponse.getData()).hasSize(2);
                }
        );
    }

    @Test
    void 사전_식물_ID로_정원_게시글_조회() {
        DictionaryPlant dictionaryPlant = dictionaryPlantSupport.builder().build();
        LongStream.rangeClosed(1, 10)
                .forEach(i -> gardenSupport.builder()
                        .dictionaryPlant(dictionaryPlant)
                        .member(memberSupport.builder().kakaoId(i).build())
                        .build());

        gardenSupport.builder()
                .member(memberSupport.builder().kakaoId(4938293L).build())
                .build();

        Pageable pageable = PageRequest.of(1, 5);
        List<Long> filters = List.of(dictionaryPlant.getId());

        GardenResponse gardenResponse = gardenService.readAll(pageable, filters);

        assertSoftly(
                softly -> {
                    softly.assertThat(gardenResponse.getElementSize()).isEqualTo(10);
                    softly.assertThat(gardenResponse.isHasNext()).isEqualTo(false);
                    softly.assertThat(gardenResponse.getSize()).isEqualTo(5);
                    softly.assertThat(gardenResponse.getData()).hasSize(5);
                }
        );
    }
}
