package com.official.pium.admin.service;

import com.amazonaws.services.s3.AmazonS3;
import com.official.pium.IntegrationTest;
import com.official.pium.admin.domain.Registration;
import com.official.pium.admin.dto.RegistrationRequest;
import com.official.pium.admin.dto.RegistrationResponse;
import com.official.pium.admin.repository.RegistrationRepository;
import com.official.pium.domain.Admin;
import com.official.pium.exception.AuthorizationException;
import com.official.pium.fixture.FileFixture;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RegistrationServiceTest extends IntegrationTest {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private RegistrationRepository registrationRepository;

    @MockBean
    private AmazonS3 amazonS3;

    @Test
    void 식물_요청의_이름과_이미지가_모두_들어오면_함께_저장() {
        RegistrationRequest request = RegistrationRequest.builder()
                .name("장미")
                .build();
        MultipartFile multipartFile = FileFixture.generateMultiPartFile();

        registrationService.save(request, multipartFile);

        List<Registration> registrations = registrationRepository.findAll();
        Registration registration = registrations.get(0);
        assertSoftly(
                softly -> {
                    assertThat(registration.getPlantName()).isEqualTo("장미");
                    assertThat(registration.getImageUrl()).isNotEmpty();
                }
        );
    }

    @Test
    void 식물_요청의_이름만_들어오면_이미지가_null로_저장() {
        RegistrationRequest request = RegistrationRequest.builder()
                .name("장미")
                .build();

        registrationService.save(request, null);

        List<Registration> registrations = registrationRepository.findAll();
        Registration registration = registrations.get(0);
        assertSoftly(
                softly -> {
                    assertThat(registration.getPlantName()).isEqualTo("장미");
                    assertThat(registration.getImageUrl()).isNull();
                }
        );
    }

    @Test
    void 식물_요청의_이미지만_들어오면_이름이_null로_저장() {
        MultipartFile multipartFile = FileFixture.generateMultiPartFile();

        registrationService.save(null, multipartFile);

        List<Registration> registrations = registrationRepository.findAll();
        Registration registration = registrations.get(0);
        assertSoftly(
                softly -> {
                    assertThat(registration.getPlantName()).isNull();
                    assertThat(registration.getImageUrl()).isNotEmpty();
                }
        );
    }

    @Test
    void 식물_요청의_이름과_이미지가_모두_들어오지_않으면_예외가_발생() {
        assertThatThrownBy(
                () -> registrationService.save(null, null)
        ).isInstanceOf(IllegalArgumentException.class)
                .hasMessage("요청 식물의 이름과 이미지 중 하나는 존재해야 합니다");
    }

    @Test
    void 존재하는_모든_요청을_조회() {
        RegistrationRequest request1 = RegistrationRequest.builder()
                .name("장미")
                .build();
        RegistrationRequest request2 = RegistrationRequest.builder()
                .name("백합")
                .build();
        Admin admin = new Admin("admin", "password", "secondPassword");
        registrationService.save(request1, null);
        registrationService.save(request2, null);

        List<RegistrationResponse> responses = registrationService.read(admin).getData();

        assertThat(responses.size()).isEqualTo(2);
    }

    @Test
    void 관리자_계정정보가_존재하지_않으면_조회시_예외가_발생() {
        assertThatThrownBy(
                () -> registrationService.read(null)
        ).isInstanceOf(AuthorizationException.class)
                .hasMessage("허가되지 않은 동작입니다");
    }

    @Test
    void 존재하는_요청을_삭제() {
        Admin admin = new Admin("admin", "password", "secondPassword");
        Registration registration = registrationRepository.save(Registration.builder()
                .plantName("장미")
                .build());

        registrationService.delete(admin, registration.getId());

        Optional<Registration> deleted = registrationRepository.findById(registration.getId());
        assertThat(deleted).isEmpty();
    }

    @Test
    void 관리자_계정정보가_존재하지_않으면_삭제시_예외가_발생() {
        assertThatThrownBy(
                () -> registrationService.delete(null, 1L)
        ).isInstanceOf(AuthorizationException.class)
                .hasMessage("허가되지 않은 동작입니다");
    }
}
