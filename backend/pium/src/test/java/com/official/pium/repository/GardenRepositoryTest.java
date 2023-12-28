package com.official.pium.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.RepositoryTest;
import com.official.pium.domain.BaseEntity;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.Garden;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.domain.vo.PlantState;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.IntStream;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class GardenRepositoryTest extends RepositoryTest {

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 정원_게시글_저장() {
        Garden garden = createGarden();
        Garden saveGarden = gardenRepository.save(garden);

        assertSoftly(
                softly -> {
                    softly.assertThat(saveGarden).isNotNull();
                    softly.assertThat(saveGarden.getId()).isEqualTo(garden.getId());
                }
        );
    }

    @ParameterizedTest
    @NullAndEmptySource
    void 필터가_없으면_정원_게시글_전체_조회(List<Long> filter) {
        Garden saveGarden1 = gardenRepository.save(createGarden());
        Garden saveGarden2 = gardenRepository.save(createGarden());
        Pageable pageRequest = PageRequest.of(0, 2);

        Page<Garden> gardens = gardenRepository.findAllByDictionaryPlantIds(pageRequest, filter);

        assertSoftly(
                softly -> {
                    softly.assertThat(gardens.getTotalElements()).isEqualTo(2);
                    softly.assertThat(gardens.getTotalPages()).isEqualTo(1);
                    softly.assertThat(gardens.getPageable()).isEqualTo(pageRequest);
                    softly.assertThat(gardens.getContent())
                            .hasSize(2)
                            .contains(saveGarden1, saveGarden2);
                }
        );
    }

    @Test
    void 사전_식물_ID로_정원_게시글_조회() {
        Garden saveGarden1 = gardenRepository.save(createGarden());
        Garden saveGarden2 = gardenRepository.save(createGarden());
        List<Long> filter = List.of(saveGarden1.getDictionaryPlant().getId());
        Pageable pageRequest = PageRequest.of(0, 2);

        Page<Garden> gardens = gardenRepository.findAllByDictionaryPlantIds(pageRequest, filter);

        assertSoftly(
                softly -> {
                    softly.assertThat(gardens.getTotalElements()).isEqualTo(1);
                    softly.assertThat(gardens.getTotalPages()).isEqualTo(1);
                    softly.assertThat(gardens.getPageable()).isEqualTo(pageRequest);
                    softly.assertThat(gardens.getContent())
                            .hasSize(1)
                            .contains(saveGarden1)
                            .doesNotContain(saveGarden2);
                }
        );
    }

    @Test
    void 페이지_번호에_따른_다른_결과_조회() {
        List<Long> filter = new ArrayList<>();
        IntStream.rangeClosed(1, 10)
                .forEach(i -> gardenRepository.save(createGarden()));
        Pageable pageRequest1 = PageRequest.of(0, 2);
        Pageable pageRequest2 = PageRequest.of(1, 3);

        Page<Garden> gardens1 = gardenRepository.findAllByDictionaryPlantIds(pageRequest1, filter);
        Page<Garden> gardens2 = gardenRepository.findAllByDictionaryPlantIds(pageRequest2, filter);

        assertSoftly(
                softly -> {
                    softly.assertThat(gardens1.getPageable()).isEqualTo(pageRequest1);
                    softly.assertThat(gardens1.getTotalPages()).isEqualTo(5);
                    softly.assertThat(gardens1.getContent()).hasSize(2);

                    softly.assertThat(gardens2.getPageable()).isEqualTo(pageRequest2);
                    softly.assertThat(gardens2.getTotalPages()).isEqualTo(4);
                    softly.assertThat(gardens2.getContent()).hasSize(3);
                }
        );
    }

    @Test
    void 정원_게시글_최신순_정렬_조회() {
        List<Long> filter = new ArrayList<>();
        IntStream.rangeClosed(1, 10)
                .forEach(i -> gardenRepository.save(createGarden()));
        PageRequest pageRequest = PageRequest.of(1, 5);

        Page<Garden> gardens = gardenRepository.findAllByDictionaryPlantIds(pageRequest, filter);

        assertSoftly(
                softly -> softly.assertThat(gardens.getContent())
                        .hasSize(5)
                        .extracting(BaseEntity::getCreatedAt)
                        .isSortedAccordingTo(Comparator.reverseOrder())
        );
    }

    private Garden createGarden() {
        PetPlant petPlant = petPlantRepository.save(createPetPlant());

        return Garden.builder()
                .dictionaryPlant(petPlant.getDictionaryPlant())
                .member(petPlant.getMember())
                .nickname(petPlant.getNickname())
                .imageUrl(petPlant.getImageUrl())
                .plantState(
                        PlantState.builder()
                                .location(petPlant.getLocation())
                                .flowerpot(petPlant.getFlowerpot())
                                .light(petPlant.getLight())
                                .wind(petPlant.getWind())
                                .build()
                )
                .daySince(petPlant.calculateDaySince(LocalDate.now()))
                .waterCycle(petPlant.getWaterCycle())
                .content("기영이가 아프네요..")
                .manageLevel("초보자")
                .build();
    }

    private PetPlant createPetPlant() {
        return PetPlant.builder()
                .dictionaryPlant(dictionaryPlantRepository.save(DictionaryPlant.builder().build()))
                .member(memberRepository.save(Member.builder().build()))
                .nickname("피우미")
                .imageUrl("https://image.com")
                .location("베란다")
                .flowerpot("화분")
                .light("밝아요")
                .wind("추워요")
                .birthDate(LocalDate.of(2020, 1, 3))
                .nextWaterDate(LocalDate.of(2020, 1, 3))
                .lastWaterDate(LocalDate.of(2020, 1, 3))
                .waterCycle(3)
                .build();
    }
}
