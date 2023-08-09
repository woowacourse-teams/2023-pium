package com.official.pium.repository;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.official.pium.RepositoryTest;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.domain.History;
import com.official.pium.domain.HistoryCategory;
import com.official.pium.domain.HistoryContent;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.domain.WaterCycle;
import java.time.LocalDate;
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


    @Test
    void 페이지_번호에_따른_다른_결과_조회() {
        //given
        Member member = Member.builder().email("hello@aaa.com").build();
        memberRepository.save(member);
        DictionaryPlant dictionaryPlant = saveDictionaryPlant();
        PetPlant petPlant = savePetPlant(member, dictionaryPlant);
        History history1 = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 1))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(generateHistoryCategory("waterCycle"))
                .build();

        History history2 = History.builder()
                .petPlant(petPlant)
                .date(LocalDate.of(2022, 1, 3))
                .historyContent(generateHistoryContent("이전", "현재"))
                .historyCategory(generateHistoryCategory("waterCycle"))
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

    private PetPlant savePetPlant(Member member, DictionaryPlant dictionaryPlant) {
        PetPlant petPlant = PetPlant.builder()
                .dictionaryPlant(dictionaryPlant)
                .member(member)
                .nickname("피우미")
                .imageUrl("https://image.com")
                .location("베란다")
                .flowerpot("화분")
                .light("밝아요")
                .wind("추워요")
                .birthDate(LocalDate.now())
                .nextWaterDate(LocalDate.now())
                .lastWaterDate(LocalDate.now())
                .waterCycle(3)
                .build();
        petPlantRepository.save(petPlant);
        return petPlant;
    }

    private DictionaryPlant saveDictionaryPlant() {
        DictionaryPlant dictionaryPlant = DictionaryPlant.builder()
                .name("스투키")
                .imageUrl("https://www.costco.co.kr/medias/sys_master/images/hd6/h37/31058517229598.jpg")
                .familyName("선인장")
                .smell("안남")
                .poison("없음")
                .manageLevel("어려움")
                .growSpeed("빨리자람")
                .requireTemp("20도")
                .minimumTemp("0도")
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
                ).build();
        dictionaryPlantRepository.save(dictionaryPlant);
        return dictionaryPlant;
    }

    private HistoryContent generateHistoryContent(String previous, String current) {
        return HistoryContent.builder()
                .previous(previous)
                .current(current)
                .build();
    }

    private HistoryCategory generateHistoryCategory(String type) {
        return historyCategoryRepository.save(HistoryCategory.builder()
                .historyType(HistoryType.from(type))
                .build());
    }
}
