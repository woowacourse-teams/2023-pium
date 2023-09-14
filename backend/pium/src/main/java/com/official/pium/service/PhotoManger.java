package com.official.pium.service;

import org.springframework.web.multipart.MultipartFile;

public interface PhotoManger {

    String upload(MultipartFile file, String workingDirectory);
}
