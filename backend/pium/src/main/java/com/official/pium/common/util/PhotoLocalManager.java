package com.official.pium.common.util;

import java.io.File;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class PhotoLocalManager implements PhotoManager {

    private static final String SLASH = "/";
    private static final int NOT_FOUND_INDEX = -1;

    @Value("${local.image.web}")
    private String webPath;

    @Value("${local.image.root}")
    private String localPath;

    @Override
    public String upload(MultipartFile multipartFile, String workingDirectory) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            throw new IllegalArgumentException("이미지 파일이 존재하지 않습니다. multipartFile: " + null);
        }
        return uploadPhoto(multipartFile, workingDirectory);
    }

    private String uploadPhoto(MultipartFile multipartFile, String workingDirectory) {
        try {
            String fileName = PhotoNameGenerator.of(multipartFile.getOriginalFilename());
            File uploadDirectory = loadDirectory(getLocalDirectoryPath(workingDirectory));
            File uploadPath = new File(uploadDirectory, fileName);
            uploadFileInLocal(multipartFile, uploadPath);

            return webPath + SLASH + workingDirectory + SLASH + fileName;
        } catch (Exception e) {
            throw new IllegalStateException("파일 업로드를 실패했습니다.");
        }
    }

    private String getLocalDirectoryPath(String workingDirectory) {
        return localPath + SLASH + workingDirectory;
    }

    private File loadDirectory(String directoryLocation) {
        File directory = new File(directoryLocation);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        return directory;
    }

    private void uploadFileInLocal(MultipartFile multipartFile, File uploadPath) {
        try {
            multipartFile.transferTo(uploadPath);
        } catch (IOException e) {
            throw new IllegalStateException("파일 변환이 실패했습니다.");
        }
    }

    @Override
    public void delete(String originalImageUrl, String workingDirectory) {
        String deletePath = getFileLocalPath(originalImageUrl);
        File file = new File(deletePath);
        deleteFile(file);
    }

    private String getFileLocalPath(String fullPath) {
        int urlIndex = fullPath.lastIndexOf(webPath);

        if (urlIndex == NOT_FOUND_INDEX) {
            throw new IllegalArgumentException("잘못된 파일 경로입니다.");
        }
        int urlNextIndex = urlIndex + webPath.length();
        return localPath + fullPath.substring(urlNextIndex);
    }

    private void deleteFile(File file) {
        if (file.exists()) {
            file.delete();
        }
    }
}
