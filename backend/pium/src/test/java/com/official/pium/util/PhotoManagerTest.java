package com.official.pium.util;

import com.official.pium.IntegrationTest;
import com.official.pium.common.util.PhotoManager;
import com.official.pium.config.ImageCleanerExtension;
import com.official.pium.fixture.FileFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(ImageCleanerExtension.class)
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PhotoManagerTest extends IntegrationTest {

    @Autowired
    private PhotoManager photoManager;

    @Test
    void 이미지를_업로드한다() {
        MultipartFile multipartFile = FileFixture.generateMultiPartFile();
        String imagePath = FileFixture.IMAGE_PATH;
        String imageUrl = photoManager.upload(multipartFile, imagePath);

        assertThat(imageUrl).isNotBlank();
    }
}
