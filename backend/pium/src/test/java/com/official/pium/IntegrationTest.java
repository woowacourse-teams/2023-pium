package com.official.pium;

import com.official.pium.support.DictionaryPlantSupport;
import com.official.pium.support.MemberSupport;
import com.official.pium.support.PetPlantSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public class IntegrationTest {

    @Autowired
    protected PetPlantSupport petPlantSupport;

    @Autowired
    protected MemberSupport memberSupport;

    @Autowired
    protected DictionaryPlantSupport dictionaryPlantSupport;
}
