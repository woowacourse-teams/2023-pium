package com.official.pium;

import com.official.pium.config.JpaAuditingConfig;
import com.official.pium.config.QueryDslConfig;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@DataJpaTest(includeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = {JpaAuditingConfig.class, QueryDslConfig.class}
))
public class RepositoryTest {
}
