package com.official.pium.history.repository;

import com.official.pium.history.domain.HistoryCategory;
import com.official.pium.history.domain.HistoryType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryCategoryRepository extends JpaRepository<HistoryCategory, Long> {

    Optional<HistoryCategory> findByHistoryType(HistoryType historyType);
}
