package com.official.pium.repository;

import com.official.pium.config.JpaAuditingConfig;
import com.official.pium.domain.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@DataJpaTest(includeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JpaAuditingConfig.class
))
class HistoryRepositoryTest {

    private PetPlant petPlant;
    private Member member;
    private DictionaryPlant dictionaryPlant;

    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private DictionaryPlantRepository dictionaryPlantRepository;
    @Autowired
    private PetPlantRepository petPlantRepository;

    @BeforeEach
    void setUp() {
        member = Member.builder().email("hello@aaa.com").build();
        memberRepository.save(member);

        dictionaryPlant = DictionaryPlant.builder()
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

        petPlant = PetPlant.builder()
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
    }

    @Test
    void 페이지_번호에_따른_다른_결과_조회() {
        History history1 = History.builder()
                .petPlant(petPlant)
                .waterDate(LocalDate.now())
                .build();
        History history2 = History.builder()
                .petPlant(petPlant)
                .waterDate(LocalDate.now())
                .build();

        historyRepository.save(history1);
        historyRepository.save(history2);
        Pageable pageable1 = PageRequest.of(0, 1);
        Page<History> histories1 = historyRepository.findAllByPetPlantId(petPlant.getId(), pageable1);
        Pageable pageable2 = PageRequest.of(1, 1);
        Page<History> histories2 = historyRepository.findAllByPetPlantId(petPlant.getId(), pageable2);

        assertAll(
                () -> assertThat(histories1.getContent().get(0).getId()).isEqualTo(history1.getId()),
                () -> assertThat(histories2.getContent().get(0).getId()).isEqualTo(history2.getId()),
                () -> assertThat(histories1.getTotalElements()).isEqualTo(2L),
                () -> assertThat(histories2.getTotalElements()).isEqualTo(2L),
                () -> assertThat(histories1.getTotalPages()).isEqualTo(2),
                () -> assertThat(histories2.getTotalPages()).isEqualTo(2)
        );
    }
}