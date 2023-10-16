package com.official.pium;

import com.official.pium.support.DictionaryPlantSupport;
import com.official.pium.support.GardenSupport;
import com.official.pium.support.HistoryCategorySupport;
import com.official.pium.support.HistorySupport;
import com.official.pium.support.MemberSupport;
import com.official.pium.support.PetPlantSupport;
import com.official.pium.support.SessionGroupSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class IntegrationTest {

    @Autowired
    protected PetPlantSupport petPlantSupport;

    @Autowired
    protected MemberSupport memberSupport;

    @Autowired
    protected DictionaryPlantSupport dictionaryPlantSupport;

    @Autowired
    protected HistorySupport historySupport;

    @Autowired
    protected HistoryCategorySupport historyCategorySupport;

    @Autowired
    protected GardenSupport gardenSupport;

    @Autowired
    protected SessionGroupSupport sessionGroupSupport;
}
