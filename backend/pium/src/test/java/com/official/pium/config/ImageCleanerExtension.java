package com.official.pium.config;

import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

public class ImageCleanerExtension implements AfterEachCallback {

    @Override
    public void afterEach(ExtensionContext context) {
        ImageCleaner.cleanUp();
    }
}
