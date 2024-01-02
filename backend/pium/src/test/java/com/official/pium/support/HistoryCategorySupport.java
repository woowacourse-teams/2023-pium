package com.official.pium.support;

import com.official.pium.history.domain.HistoryCategory;
import com.official.pium.history.domain.HistoryType;
import com.official.pium.history.repository.HistoryCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@SuppressWarnings("NonAsciiCharacters")
public class HistoryCategorySupport {

    private final HistoryCategoryRepository historyCategoryRepository;

    public HistoryCategoryBuilder builder() {
        return new HistoryCategoryBuilder();
    }

    public HistoryCategory findByHistoryCategory(HistoryType historyType) {
        return historyCategoryRepository.findByHistoryType(historyType).get();
    }

    public final class HistoryCategoryBuilder {

        private HistoryType historyType;

        public HistoryCategoryBuilder historyType(HistoryType historyType) {
            this.historyType = historyType;
            return this;
        }

        public HistoryCategory build() {
            return historyCategoryRepository.save(
                    HistoryCategory.builder()
                            .historyType(historyType == null ? HistoryType.FLOWERPOT : historyType)
                            .build()
            );
        }
    }
}
