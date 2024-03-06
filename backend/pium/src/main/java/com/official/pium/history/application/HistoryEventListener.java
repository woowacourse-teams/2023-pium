package com.official.pium.history.application;

import com.official.pium.history.domain.History;
import com.official.pium.history.domain.HistoryCategory;
import com.official.pium.history.domain.HistoryType;
import com.official.pium.history.domain.vo.HistoryContent;
import com.official.pium.history.repository.HistoryCategoryRepository;
import com.official.pium.history.repository.HistoryRepository;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.petPlant.event.history.HistoryEvent;
import com.official.pium.petPlant.event.history.HistoryEvents;
import com.official.pium.petPlant.event.history.LastWaterDateEvent;
import com.official.pium.petPlant.repository.PetPlantRepository;
import java.util.List;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class HistoryEventListener {

    private final PetPlantRepository petPlantRepository;
    private final HistoryRepository historyRepository;
    private final HistoryCategoryRepository historyCategoryRepository;

    @EventListener
    @Transactional
    public void savePetPlantHistories(HistoryEvents historyEvents) {
        List<HistoryCategory> categories = historyCategoryRepository.findAll();

        for (HistoryEvent historyEvent : historyEvents.getHistoryEvents()) {
            PetPlant petPlant = petPlantRepository.findById(historyEvent.getPetPlantId())
                    .orElseThrow(
                            () -> new NoSuchElementException(
                                    "일치하는 반려 식물이 존재하지 않습니다. id: " + historyEvent.getPetPlantId()));

            HistoryCategory historyCategory = categories.stream()
                    .filter(it -> it.getHistoryType() == historyEvent.getHistoryType())
                    .findAny()
                    .orElseThrow(() -> new NoSuchElementException(
                            "존재하지 않는 히스토리 타입입니다. type: " + historyEvent.getHistoryType()));

            History history = History.builder()
                    .petPlant(petPlant)
                    .date(historyEvent.getDate())
                    .historyCategory(historyCategory)
                    .historyContent(HistoryContent.builder()
                            .previous(historyEvent.getPrevious())
                            .current(historyEvent.getCurrent())
                            .build())
                    .build();

            historyRepository.save(history);
        }
    }

    @EventListener
    @Transactional
    public void savePetPlantHistory(HistoryEvent historyEvent) {
        PetPlant petPlant = petPlantRepository.findById(historyEvent.getPetPlantId())
                .orElseThrow(
                        () -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + historyEvent.getPetPlantId()));

        HistoryCategory historyCategory = historyCategoryRepository.findByHistoryType(historyEvent.getHistoryType())
                .orElseThrow(
                        () -> new NoSuchElementException("존재하지 않는 히스토리 타입입니다. type: " + historyEvent.getHistoryType()));

        History history = History.builder()
                .petPlant(petPlant)
                .date(historyEvent.getDate())
                .historyCategory(historyCategory)
                .historyContent(HistoryContent.builder()
                        .previous(historyEvent.getPrevious())
                        .current(historyEvent.getCurrent())
                        .build())
                .build();

        historyRepository.save(history);
    }

    @EventListener
    @Transactional
    public void updateLastWaterDateHistory(LastWaterDateEvent lastWaterDateEvent) {
        final PageRequest TOP_ORDER_BY_DATE_DESC = PageRequest.of(0, 1, Sort.Direction.DESC, "date");

        Slice<History> historyAboutLastWaterDate = historyRepository.findAllByPetPlantIdAndHistoryCategoryHistoryType(
                lastWaterDateEvent.getPetPlantId(),
                HistoryType.LAST_WATER_DATE, TOP_ORDER_BY_DATE_DESC
        );

        validateContentSize(historyAboutLastWaterDate);

        for (History history : historyAboutLastWaterDate.getContent()) {
            history.updateDate(lastWaterDateEvent.getCurrentWaterDate());
            history.updateHistoryContent(
                    HistoryContent.builder()
                            .previous(history.getHistoryContent().getPrevious())
                            .current(lastWaterDateEvent.getCurrentWaterDate().toString())
                            .build()
            );
        }
    }

    private void validateContentSize(Slice<History> historyAboutLastWaterDate) {
        if (historyAboutLastWaterDate.getSize() != 1) {
            throw new IllegalStateException("최근 물주기 정보는 하나의 값만 존재해야합니다. size: " + historyAboutLastWaterDate.getSize());
        }
    }
}
