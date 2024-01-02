package com.official.pium.admin.service;

import com.official.pium.admin.domain.Registration;
import com.official.pium.admin.service.dto.RegistrationRequest;
import com.official.pium.admin.service.dto.RegistrationResponse;
import com.official.pium.admin.mapper.RegistrationMapper;
import com.official.pium.admin.repository.RegistrationRepository;
import com.official.pium.admin.domain.Admin;
import com.official.pium.common.exception.AuthorizationException;
import com.official.pium.common.util.PhotoManager;
import com.official.pium.common.dto.DataResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RegistrationService {

    @Value("${registration.image.directory}")
    private String workingDirectory;

    private final RegistrationRepository registrationRepository;
    private final PhotoManager photoManager;

    @Transactional
    public void save(RegistrationRequest request, MultipartFile multipartFile) {
        if (request == null && multipartFile == null) {
            throw new IllegalArgumentException("요청 식물의 이름과 이미지 중 하나는 존재해야 합니다");
        }

        if (multipartFile == null) {
            validateName(request);
            Registration registration = RegistrationMapper.toRegistration(request.getName(), null);
            registrationRepository.save(registration);
            return;
        }

        String imageUrl = photoManager.upload(multipartFile, workingDirectory);

        if (request == null) {
            Registration registration = RegistrationMapper.toRegistration(null, imageUrl);
            registrationRepository.save(registration);
            return;
        }

        Registration registration = RegistrationMapper.toRegistration(request.getName(), imageUrl);
        registrationRepository.save(registration);
    }

    private void validateName(RegistrationRequest request) {
        if (request.getName().isBlank()) {
            throw new IllegalArgumentException("요청 식물의 이름과 이미지 중 하나는 존재해야 합니다");
        }
    }

    public DataResponse<List<RegistrationResponse>> read(Admin admin) {
        checkAdmin(admin);
        List<Registration> registrations = registrationRepository.findAll();

        List<RegistrationResponse> registrationResponses = registrations.stream()
                .map(RegistrationMapper::toResponse)
                .collect(Collectors.toList());
        return DataResponse.<List<RegistrationResponse>>builder()
                .data(registrationResponses)
                .build();
    }

    @Transactional
    public void delete(Admin admin, Long id) {
        checkAdmin(admin);
        registrationRepository.deleteById(id);
    }

    private void checkAdmin(Admin admin) {
        if (admin == null) {
            throw new AuthorizationException("허가되지 않은 동작입니다");
        }
    }
}
