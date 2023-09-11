package com.official.pium.domain.vo;

import java.util.Set;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PhotoName {

    private static final Set<String> IMAGE_EXTENSIONS = Set.of("jpeg", "jpg", "png", "webp", "heic", "heif");
    private static final String UNDER_BAR = "_";
    private static final String DOT = ".";

    public static String of(String originalFilename) {
        validateFileName(originalFilename);
        return convertNameToPath(originalFilename);
    }

    private static String convertNameToPath(String originalFilename) {
        validateFileName(originalFilename);
        String extension = StringUtils.getFilenameExtension(originalFilename);

        if (extension == null) {
            throw new IllegalArgumentException("파일 확장자는 반드시 포함되어야 합니다. filename: " + originalFilename);
        }
        String fileBaseName = UUID.randomUUID().toString().substring(0, 8);
        validateFileName(fileBaseName);
        validateExtension(extension);

        return fileBaseName + UNDER_BAR + System.currentTimeMillis() + DOT + extension;
    }

    private static void validateFileName(String fileName) {
        if (fileName == null || fileName.isBlank()) {
            throw new IllegalArgumentException("파일 이름은 반드시 포함되어야 합니다. filename: " + fileName);
        }
    }

    private static void validateExtension(String extension) {
        if (!IMAGE_EXTENSIONS.contains(extension.toLowerCase())) {
            throw new IllegalArgumentException("이미지 파일 확장자만 업로드 가능합니다. extension: " + extension);
        }
    }
}
