package com.official.pium;

import com.official.pium.config.DatabaseClearExtension;
import com.official.pium.domain.Member;
import com.official.pium.support.MemberSupport;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@ExtendWith(DatabaseClearExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AcceptanceTest {

    @LocalServerPort
    int port;

    @Autowired
    private MemberSupport memberSupport;
    protected Member member;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        member = memberSupport.builder().build();
    }
}
