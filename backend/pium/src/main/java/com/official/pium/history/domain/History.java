package com.official.pium.history.domain;

import com.official.pium.common.domain.BaseEntity;
import com.official.pium.history.domain.vo.HistoryContent;
import com.official.pium.petPlant.domain.PetPlant;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

@Entity
@Getter
@Table(name = "history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class History extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_plant_id", nullable = false)
    private PetPlant petPlant;

    @NotNull
    @Column(name = "event_date", nullable = false)
    private LocalDate date;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "history_category_id", nullable = false)
    private HistoryCategory historyCategory;

    @Valid
    @NotNull
    @Embedded
    private HistoryContent historyContent;

    @Builder
    private History(PetPlant petPlant, LocalDate date, HistoryCategory historyCategory, HistoryContent historyContent) {
        this.petPlant = petPlant;
        this.date = date;
        this.historyCategory = historyCategory;
        this.historyContent = historyContent;
    }

    public void updateHistoryContent(HistoryContent historyContent) {
        validateHistoryContent(historyContent);
        this.historyContent = historyContent;
    }

    public void updateDate(LocalDate newDate) {
        if (newDate.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("히스토리 날짜는 오늘 이후일 수 없습니다. newDate: " + newDate);
        }
        this.date = newDate;
    }

    private void validateHistoryContent(HistoryContent historyContent) {
        if (historyContent == null) {
            throw new IllegalArgumentException("히스토리 상세 정보는 null이 될 수 없습니다. historyContent: null");
        }
        if (historyContent.getPrevious() == null) {
            throw new IllegalArgumentException("히스토리 상세 정보는 null이 될 수 없습니다. historyContent.previous: null");
        }
        if (historyContent.getCurrent() == null) {
            throw new IllegalArgumentException("히스토리 상세 정보는 null이 될 수 없습니다. historyContent.current: null");
        }
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null) {
            return false;
        }
        Class<?> oEffectiveClass =
                o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass()
                        : o.getClass();
        Class<?> thisEffectiveClass =
                this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
                        .getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) {
            return false;
        }
        History history = (History) o;
        return getId() != null && Objects.equals(getId(), history.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
                .getPersistentClass().hashCode() : getClass().hashCode();
    }
}
