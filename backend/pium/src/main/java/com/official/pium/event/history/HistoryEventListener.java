package com.official.pium.event.history;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryCategory;
import com.official.pium.domain.HistoryContent;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.HistoryCategoryRepository;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.PetPlantRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class HistoryEventListener {

    private static final int JUST_ONE = 1;
    private static final PageRequest TOP_ORDER_BY_DATE_DESC = PageRequest.of(0, 1, Sort.Direction.DESC, "date");

    private final PetPlantRepository petPlantRepository;
    private final HistoryRepository historyRepository;
    private final HistoryCategoryRepository historyCategoryRepository;

    @EventListener
    @Transactional
    public void savePetPlantHistory(HistoryEvent historyEvent) {

        PetPlant petPlant = petPlantRepository.findById(historyEvent.getPetPlantId())
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + historyEvent.getPetPlantId()));

        HistoryCategory historyCategory = historyCategoryRepository.findByHistoryType(historyEvent.getHistoryType())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 히스토리 타입입니다. type: " + historyEvent.getHistoryType()));

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

        Page<History> historyAboutLastWaterDate = historyRepository.findAllByPetPlantIdAndHistoryCategoryHistoryType(lastWaterDateEvent.getPetPlantId(), HistoryType.LAST_WATER_DATE, TOP_ORDER_BY_DATE_DESC);

        if (historyAboutLastWaterDate.getSize() == JUST_ONE) {
            for (History history : historyAboutLastWaterDate.getContent()) {
                history.updateHistoryContent(
                        HistoryContent.builder()
                                .previous(history.getHistoryContent().getPrevious())
                                .current(lastWaterDateEvent.getCurrentWaterDate().toString())
                                .build()
                );
            }
        }

    }
}
