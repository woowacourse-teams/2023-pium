package com.official.pium.admin.ui;

import com.official.pium.admin.domain.Admin;
import com.official.pium.admin.service.RegistrationService;
import com.official.pium.admin.service.dto.RegistrationRequest;
import com.official.pium.admin.service.dto.RegistrationResponse;
import com.official.pium.common.dto.DataResponse;
import com.official.pium.member.ui.Auth;
import jakarta.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/dictionary-registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> save(
            @RequestPart(name = "request", required = false) RegistrationRequest request,
            @RequestPart(name = "image", required = false) MultipartFile multipartFile) {
        registrationService.save(request, multipartFile);
        return ResponseEntity.created(URI.create("/dictionary-registrations")).build();
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<RegistrationResponse>>> read(@Auth Admin admin) {
        DataResponse<List<RegistrationResponse>> dataResponse = registrationService.read(admin);
        return ResponseEntity.ok().body(dataResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Auth Admin admin,
            @PathVariable @Positive(message = "삭제 요청 ID는 1이상의 값이어야 합니다.") Long id) {
        registrationService.delete(admin, id);
        return ResponseEntity.noContent().build();
    }
}
