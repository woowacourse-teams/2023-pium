package com.official.pium.fixture;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class FileFixture {

    public static final String IMAGE_PATH = "image";
    private static final byte[] IMAGE = generateMockImage();

    public static byte[] generateMockImage() {
        BufferedImage image = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            ImageIO.write(image, "jpg", byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new IllegalStateException("이미지 생성에 실패했습니다.");
        }
    }

    public static MultipartFile generateMultiPartFile() {
        return new MockMultipartFile(
                "image",
                "pium.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                IMAGE
        );
    }
}
