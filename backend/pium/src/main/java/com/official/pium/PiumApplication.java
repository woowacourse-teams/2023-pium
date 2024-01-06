package com.official.pium;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PiumApplication {

    public static void main(String[] args) {
        SpringApplication.run(PiumApplication.class, args);
    }
}
