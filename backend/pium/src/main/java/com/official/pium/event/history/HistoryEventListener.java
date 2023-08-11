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
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class HistoryEventListener {

    private final PetPlantRepository petPlantRepository;
    private final HistoryRepository historyRepository;
    private final HistoryCategoryRepository historyCategoryRepository;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
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
}
