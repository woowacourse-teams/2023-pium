package com.official.pium.support;

import com.official.pium.domain.History;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
public class HistorySupport {

    private final HistoryRepository historyRepository;
    private final PetPlantSupport petPlantSupport;

    public HistoryBuilder builder() {
        return new HistoryBuilder();
    }

    public final class HistoryBuilder {
        private PetPlant petPlant;

        public HistoryBuilder petPlant(PetPlant petPlant) {
            this.petPlant = petPlant;
            return this;
        }

        public History build() {
            return historyRepository.save(
                    History.builder()
                            .waterDate(LocalDate.now())
                            .petPlant(petPlant == null ? petPlantSupport.builder().build() : petPlant)
                            .build()
            );
        }
    }
}
