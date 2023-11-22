package com.official.pium.config;

import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class ImageCleaner {

    private static final String TEST_FILE_ROOT_PATH = "src/test/resources/";

    public static void cleanUp() {
        deleteFolder(TEST_FILE_ROOT_PATH);
    }

    private static void deleteFolder(String path) {
        File folder = new File(path);
        if (folder.exists()) {
            deleteFileRecursive(folder);
        }
    }

    private static void deleteFileRecursive(File file) {
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files == null) {
                return;
            }

            for (File child : files) {
                deleteFileRecursive(child);
            }
        }
        if (file.getName().contains("application.yml")) {
            return;
        }
        file.delete();
    }
}
