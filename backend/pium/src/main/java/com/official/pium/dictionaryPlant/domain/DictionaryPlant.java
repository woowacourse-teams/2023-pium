package com.official.pium.dictionaryPlant.domain;

import com.official.pium.common.domain.BaseEntity;
import com.official.pium.dictionaryPlant.domain.vo.CareDetail;
import com.official.pium.dictionaryPlant.domain.vo.Classification;
import com.official.pium.dictionaryPlant.domain.vo.Property;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

@Entity
@Getter
@Table(name = "dictionary_plant")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DictionaryPlant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

    @Embedded
    private Classification classification;

    @Embedded
    private Property property;

    @Embedded
    private CareDetail careDetail;

    @Builder
    private DictionaryPlant(
            String imageUrl,
            Classification classification,
            Property property,
            CareDetail careDetail
    ) {
        this.imageUrl = imageUrl;
        this.classification = classification;
        this.property = property;
        this.careDetail = careDetail;
    }

    public void updateDictionaryPlant(
            String imageUrl,
            Classification classification,
            Property property,
            CareDetail careDetail
    ) {
        this.imageUrl = imageUrl;
        this.classification = classification;
        this.property = property;
        this.careDetail = careDetail;
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
        DictionaryPlant that = (DictionaryPlant) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer()
                .getPersistentClass().hashCode() : getClass().hashCode();
    }
}
