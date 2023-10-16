package com.official.pium.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

@Entity
@Getter
@Table(name = "session_group")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SessionGroup extends BaseEntity {

    private static final int SESSION_EXTEND_DAYS = 7;
    private static final int MIN_EXPIRE_DAY = 1;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "session_id", nullable = false)
    private String sessionId;

    @NotBlank
    @Column(name = "session_key", nullable = false)
    private String sessionKey;

    @NotBlank
    @Column(name = "session_value", nullable = false)
    private String sessionValue;

    @NotNull
    @Column(name = "expire_time", nullable = false)
    private LocalDateTime expireTime;

    @Builder
    private SessionGroup(String sessionId, String sessionKey, String sessionValue, LocalDateTime expireTime) {
        this.sessionId = sessionId;
        this.sessionKey = sessionKey;
        this.sessionValue = sessionValue;
        this.expireTime = expireTime;
    }

    public boolean isExpired(LocalDateTime currentTime) {
        return expireTime.isBefore(currentTime);
    }

    public boolean canExtends(LocalDateTime currentTime) {
        return ChronoUnit.DAYS.between(currentTime, expireTime) < SESSION_EXTEND_DAYS;
    }

    public void extendExpireTime(long extendDay) {
        if (extendDay < MIN_EXPIRE_DAY) {
            throw new IllegalArgumentException("세션 연장 가능 일수는 음수가 될 수 없습니다.");
        }
        this.expireTime = this.expireTime.plusDays(extendDay);
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
        SessionGroup sessionGroup = (SessionGroup) o;
        return getId() != null && Objects.equals(getId(), sessionGroup.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
                .getPersistentClass().hashCode() : getClass().hashCode();
    }
}
