package com.official.pium.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.official.pium.fixture.FileFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith({MockitoExtension.class})
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PhotoS3ManagerTest {

    @InjectMocks
    private PhotoS3Manager photoS3Manager;

    @Mock
    private AmazonS3 s3Client;

    @Test
    void 이미지를_업로드한다() {
        MultipartFile multipartFile = FileFixture.generateMultiPartFile();
        given(s3Client.putObject(any(PutObjectRequest.class)))
                .willReturn(new PutObjectResult());

        String imageUrl = photoS3Manager.upload(multipartFile, "test");

        assertThat(imageUrl).isNotBlank();
    }
}
