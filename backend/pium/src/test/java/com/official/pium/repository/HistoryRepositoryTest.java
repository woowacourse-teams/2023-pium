package com.official.pium.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.RepositoryTest;
import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import com.official.pium.dictionaryPlant.domain.vo.CareDetail;
import com.official.pium.dictionaryPlant.domain.vo.Classification;
import com.official.pium.dictionaryPlant.domain.vo.Property;
import com.official.pium.dictionaryPlant.repository.DictionaryPlantRepository;
import com.official.pium.history.domain.History;
import com.official.pium.history.domain.HistoryCategory;
import com.official.pium.history.domain.HistoryType;
import com.official.pium.history.domain.vo.HistoryContent;
import com.official.pium.history.repository.HistoryCategoryRepository;
import com.official.pium.history.repository.HistoryRepository;
import com.official.pium.member.domain.Member;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.domain.vo.PetPlantState;
import com.official.pium.petPlant.domain.vo.Temperature;
import com.official.pium.petPlant.domain.vo.WaterCycle;
import com.official.pium.petPlant.domain.vo.WaterDetail;
import com.official.pium.petPlant.repository.PetPlantRepository;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class HistoryRepositoryTest extends RepositoryTest {

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;

    @Autowired
    private PetPlantRepository petPlantRepository;

    @Autowired
    private HistoryCategoryRepository historyCategoryRepository;

    @BeforeEach
    void setUp() {
        for (HistoryType type : HistoryType.values()) {
            historyCategoryRepository.save(HistoryCategory.builder()
                    .historyType(type)
                    .build());
        }
    }

    @Test
    void 페이지_번호에_따른_다른_결과_조회() {
        //given
        Member member = saveMember();
        DictionaryPlant dictionaryPlant = saveDictionaryPlant();
        PetPlant petPlant = savePetPlant(member, dictionaryPlant);
        History history1 = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 1))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(findHistoryCategory(HistoryType.FLOWERPOT))
                .build();

        History history2 = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 3))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(findHistoryCategory(HistoryType.FLOWERPOT))
                .build();

        //when
        historyRepository.save(history1);
        historyRepository.save(history2);
        Pageable pageable1 = PageRequest.of(0, 1, Sort.Direction.DESC, "date");
        Page<History> histories1 = historyRepository.findAllByPetPlantId(petPlant.getId(), pageable1);
        Pageable pageable2 = PageRequest.of(1, 1, Sort.Direction.DESC, "date");
        Page<History> histories2 = historyRepository.findAllByPetPlantId(petPlant.getId(), pageable2);

        //then
        assertSoftly(
                softly -> {
                    softly.assertThat(histories1.getContent().get(0).getId()).isEqualTo(history2.getId());
                    softly.assertThat(histories2.getContent().get(0).getId()).isEqualTo(history1.getId());
                    softly.assertThat(histories1.getTotalElements()).isEqualTo(2L);
                    softly.assertThat(histories2.getTotalElements()).isEqualTo(2L);
                    softly.assertThat(histories1.getTotalPages()).isEqualTo(2);
                    softly.assertThat(histories2.getTotalPages()).isEqualTo(2);
                }
        );
    }

    @Test
    void 히스토리_타입_리스트에_포함된_히스토리만_조회() {
        //given
        Member member = saveMember();
        DictionaryPlant dictionaryPlant = saveDictionaryPlant();
        PetPlant petPlant = savePetPlant(member, dictionaryPlant);

        History flowerpotHistory = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 1))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(findHistoryCategory(HistoryType.FLOWERPOT))
                .build();
        History locationHistory = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 3))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(findHistoryCategory(HistoryType.LOCATION))
                .build();
        History windHistory = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 3))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(findHistoryCategory(HistoryType.WIND))
                .build();

        //when
        historyRepository.save(flowerpotHistory);
        historyRepository.save(locationHistory);
        historyRepository.save(windHistory);
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.Direction.DESC, "date");
        Page<History> histories = historyRepository.findAllByPetPlantIdAndHistoryTypes(petPlant.getId(),
                List.of(HistoryType.FLOWERPOT, HistoryType.LOCATION), pageRequest);

        //then
        assertSoftly(
                softly -> {
                    softly.assertThat(histories.getContent()
                                    .stream()
                                    .map(history -> history.getHistoryCategory().getHistoryType())
                                    .toList())
                            .contains(HistoryType.FLOWERPOT, HistoryType.LOCATION)
                            .doesNotContain(HistoryType.WIND);
                    softly.assertThat(histories.getTotalElements()).isEqualTo(2L);
                    softly.assertThat(histories.getTotalPages()).isEqualTo(1);
                }
        );
    }

    private Member saveMember() {
        Member member = Member.builder().build();
        memberRepository.save(member);
        return member;
    }

    private PetPlant savePetPlant(Member member, DictionaryPlant dictionaryPlant) {
        PetPlant petPlant = PetPlant.builder()
                .dictionaryPlant(dictionaryPlant)
                .member(member)
                .nickname("피우미")
                .imageUrl("https://image.com")
                .petPlantState(
                        PetPlantState.builder()
                                .location("베란다")
                                .flowerpot("화분")
                                .light("밝아요")
                                .wind("추워요")
                                .build()
                )
                .birthDate(LocalDate.of(2021, 6, 4))
                .waterDetail(
                        WaterDetail.builder()
                                .nextWaterDate(LocalDate.of(2021, 6, 4))
                                .lastWaterDate(LocalDate.of(2021, 6, 4))
                                .build()
                )
                .waterCycle(3)
                .build();
        petPlantRepository.save(petPlant);
        return petPlant;
    }

    private DictionaryPlant saveDictionaryPlant() {
        DictionaryPlant dictionaryPlant = DictionaryPlant.builder()
                .classification(Classification.builder()
                        .name("스투키")
                        .familyName("선인장")
                        .build())
                .imageUrl("https://www.costco.co.kr/medias/sys_master/images/hd6/h37/31058517229598.jpg")
                .property(Property.builder()
                        .smell("안남")
                        .poison("없음")
                        .manageLevel("어려움")
                        .growSpeed("빨리자람")
                        .build())
                .careDetail(CareDetail.builder()
                        .temperature(Temperature.builder()
                                .requireTemp("20도")
                                .minimumTemp("0도")
                                .build())
                        .requireHumidity("15%")
                        .postingPlace("베란다 앞")
                        .specialManageInfo("물을 많이 주지않아도 됩니다.")
                        .waterCycle(
                                WaterCycle.builder()
                                        .spring("겉흙이 마르면 촉촉하게")
                                        .summer("겉흙이 마르면 촉촉하게")
                                        .autumn("겉흙이 마르면 촉촉하게")
                                        .winter("겉흙이 마르면 촉촉하게")
                                        .build()
                        )
                        .build()
                )
                .build();
        dictionaryPlantRepository.save(dictionaryPlant);
        return dictionaryPlant;
    }

    private HistoryContent generateHistoryContent(String previous, String current) {
        return HistoryContent.builder()
                .previous(previous)
                .current(current)
                .build();
    }

    private HistoryCategory findHistoryCategory(HistoryType historyType) {
        return historyCategoryRepository.findByHistoryType(historyType).get();
    }
}
