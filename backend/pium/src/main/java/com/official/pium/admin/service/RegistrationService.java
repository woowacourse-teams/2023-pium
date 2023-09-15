package com.official.pium.admin.service;

import com.official.pium.admin.domain.Registration;
import com.official.pium.admin.dto.RegistrationRequest;
import com.official.pium.admin.dto.RegistrationResponse;
import com.official.pium.admin.mapper.RegistrationMapper;
import com.official.pium.admin.repository.RegistrationRepository;
import com.official.pium.domain.Admin;
import com.official.pium.exception.AuthorizationException;
import com.official.pium.service.PhotoManger;
import com.official.pium.service.dto.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RegistrationService {

    @Value("${registration.image.directory}")
    private String workingDirectory;

    private final RegistrationRepository registrationRepository;
    private final PhotoManger photoManger;

    @Transactional
    public void save(RegistrationRequest request, MultipartFile multipartFile) {
        if (request == null && multipartFile == null) {
            throw new IllegalArgumentException("이름과 이미지 중 하나는 존재해야 합니다");
        }

        if (multipartFile == null) {
            Registration registration = RegistrationMapper.toRegistration(request.getName(), null);
            registrationRepository.save(registration);
            return;
        }

        String imageUrl = photoManger.upload(multipartFile, workingDirectory);

        if (request == null) {
            Registration registration = RegistrationMapper.toRegistration(null, imageUrl);
            registrationRepository.save(registration);
            return;
        }

        Registration registration = RegistrationMapper.toRegistration(request.getName(), imageUrl);
        registrationRepository.save(registration);
    }

    public DataResponse<List<RegistrationResponse>> read(Admin admin) {
        if (admin == null) {
            throw new AuthorizationException();
        }
        List<Registration> registrations = registrationRepository.findAll();

        List<RegistrationResponse> registrationResponses = registrations.stream()
                .map(registration -> RegistrationResponse.builder()
                        .name(registration.getPlantName())
                        .imageUrl(registration.getImageUrl())
                        .build())
                .collect(Collectors.toList());
        DataResponse<List<RegistrationResponse>> dataResponse = DataResponse.<List<RegistrationResponse>>builder()
                .data(registrationResponses)
                .build();
        return dataResponse;
    }

    @Transactional
    public void delete(Admin admin, Long id) {
        if (admin == null) {
            throw new AuthorizationException();
        }
        registrationRepository.deleteById(id);
    }
}
