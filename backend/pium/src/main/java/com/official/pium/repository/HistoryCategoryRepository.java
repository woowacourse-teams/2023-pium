package com.official.pium.repository;

import com.official.pium.domain.HistoryCategory;
import com.official.pium.domain.HistoryType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryCategoryRepository extends JpaRepository<HistoryCategory, Long> {

    Optional<HistoryCategory> findByHistoryType(HistoryType historyType);
}
