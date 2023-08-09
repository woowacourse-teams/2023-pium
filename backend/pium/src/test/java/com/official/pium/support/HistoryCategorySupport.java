package com.official.pium.support;

import com.official.pium.domain.HistoryCategory;
import com.official.pium.domain.HistoryType;
import com.official.pium.repository.HistoryCategoryRepository;
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
