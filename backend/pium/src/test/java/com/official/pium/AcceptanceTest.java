package com.official.pium;

import com.official.pium.config.DatabaseClearExtension;
import com.official.pium.domain.HistoryType;
import com.official.pium.domain.Member;
import com.official.pium.support.DictionaryPlantSupport;
import com.official.pium.support.HistoryCategorySupport;
import com.official.pium.support.MemberSupport;
import com.official.pium.support.PetPlantSupport;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class AcceptanceTest {

    @LocalServerPort
    int port;

    @Autowired
    protected MemberSupport memberSupport;

    @Autowired
    protected HistoryCategorySupport historyCategorySupport;

    @Autowired
    protected PetPlantSupport petPlantSupport;

    @Autowired
    protected DictionaryPlantSupport dictionaryPlantSupport;

    protected Member member;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        member = memberSupport.builder().build();

        for (HistoryType type : HistoryType.values()) {
            historyCategorySupport.builder()
                    .historyType(type)
                    .build();
        }
    }
}
