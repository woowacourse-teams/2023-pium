package com.official.pium.event.history;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryCategory;
import com.official.pium.domain.HistoryContent;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.HistoryCategoryRepository;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.PetPlantRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class HistoryEventListener {

    private final PetPlantRepository petPlantRepository;
    private final HistoryRepository historyRepository;
    private final HistoryCategoryRepository historyCategoryRepository;

    @EventListener
    public void savePetPlantHistory(HistoryEvent event) {

        PetPlant petPlant = petPlantRepository.findById(event.getPetPlantId())
                .orElseThrow(() -> new NoSuchElementException("일치하는 반려 식물이 존재하지 않습니다. id: " + event.getPetPlantId()));

        HistoryCategory historyCategory = historyCategoryRepository.findByHistoryType(event.getHistoryType())
                .orElseThrow(() -> new NoSuchElementException("존재하지 않는 히스토리 타입입니다. type: " + event.getHistoryType()));

        History history = History.builder()
                .petPlant(petPlant)
                .date(event.getDate())
                .historyCategory(historyCategory)
                .historyContent(HistoryContent.builder()
                        .previous(event.getPrevious())
                        .current(event.getCurrent())
                        .build())
                .build();

        historyRepository.save(history);
    }
}