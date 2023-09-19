package com.official.pium.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.official.pium.service.PhotoManager;
import java.io.File;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class PhotoS3Manager implements PhotoManager {

    private static final String SLASH = "/";
    private static final String SYSTEM_PATH = System.getProperty("user.dir");

    private final AmazonS3 s3Client;

    @Value("${aws.s3.root}")
    private String rootPath;

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Value("${aws.s3.folder}")
    private String folder;

    @Value("${aws.s3.directory}")
    private String directory;

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
            File file = uploadFileInLocal(multipartFile, uploadPath);

            s3Client.putObject(new PutObjectRequest(bucket + folder + directory + workingDirectory, fileName, file));

            file.delete();
            return rootPath + SLASH + directory + workingDirectory + SLASH + fileName;
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalStateException("파일 업로드를 실패했습니다.");
        }
    }

    private String getLocalDirectoryPath(String workingDirectory) {
        return SYSTEM_PATH + SLASH + directory + workingDirectory;
    }

    private File loadDirectory(String directoryLocation) {
        File directory = new File(directoryLocation);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        return directory;
    }

    private File uploadFileInLocal(MultipartFile multipartFile, File uploadPath) {
        try {
            multipartFile.transferTo(uploadPath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new IllegalStateException("파일 변환이 실패했습니다.");
        }
        return uploadPath;
    }
}
