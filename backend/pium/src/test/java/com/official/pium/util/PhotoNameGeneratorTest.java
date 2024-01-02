package com.official.pium.util;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.official.pium.common.util.PhotoNameGenerator;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PhotoNameGeneratorTest {

    @Test
    void 이미지_파일명을_생성한다() {
        String filename = "https://images.image1.png";

        String uploadImageName = PhotoNameGenerator.of(filename);

        assertThat(uploadImageName).isNotBlank();
    }

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = " ")
    void 파일_이름이_없으면_예외가_발생한다(String filename) {
        assertThatThrownBy(() -> PhotoNameGenerator.of(filename))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("파일 이름은 반드시 포함되어야 합니다. filename: " + filename);
    }

    @ParameterizedTest
    @ValueSource(strings = {"pium", "gray", "hamad", "joy", "juno"})
    void 파일_확장자가_없으면_예외가_발생한다(String filename) {
        assertThatThrownBy(() -> PhotoNameGenerator.of(filename))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("파일 확장자는 반드시 포함되어야 합니다. filename: " + filename);
    }

    @ParameterizedTest
    @ValueSource(strings = {"file.pdf", "file2.zip", "file3.exe"})
    void 이미지_파일_확장자가_아니면_예외가_발생한다(String filename) {
        assertThatThrownBy(() -> PhotoNameGenerator.of(filename))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미지 파일 확장자만 업로드 가능합니다. extension: " + filename.split("\\.")[1]);
    }
}
