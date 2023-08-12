package com.official.pium.support;

import com.official.pium.domain.History;
import com.official.pium.domain.HistoryCategory;
import com.official.pium.domain.HistoryContent;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.HistoryRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
public class HistorySupport {

    private final HistoryCategorySupport historyCategorySupport;
    private final HistoryRepository historyRepository;
    private final PetPlantSupport petPlantSupport;

    public HistoryBuilder builder() {
        return new HistoryBuilder();
    }

    public final class HistoryBuilder {
        private PetPlant petPlant;
        private HistoryCategory historyCategory;
        private LocalDate date;
        private String previous;
        private String current;

        public HistoryBuilder petPlant(PetPlant petPlant) {
            this.petPlant = petPlant;
            return this;
        }

        public HistoryBuilder historyCategory(HistoryCategory historyCategory) {
            this.historyCategory = historyCategory;
            return this;
        }

        public HistoryBuilder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public HistoryBuilder previous(String previous) {
            this.previous = previous;
            return this;
        }

        public HistoryBuilder current(String current) {
            this.current = current;
            return this;
        }

        public History build() {
            return historyRepository.save(
                    History.builder()
                            .date(date == null ? LocalDate.of(2022, 3, 4) : date)
                            .historyCategory(historyCategory == null ? historyCategorySupport.findByHistoryCategory(HistoryType.LAST_WATER_DATE)
                                    : historyCategory)
                            .historyContent(HistoryContent.builder()
                                    .previous(previous == null ? "변경 전 값" : previous)
                                    .current(current == null ? "변경 된 값" : current)
                                    .build())
                            .petPlant(petPlant == null ? petPlantSupport.builder().build() : petPlant)
                            .build()
            );
        }
    }
}
