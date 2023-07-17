package com.official.pium.controller;

import com.official.pium.exception.dto.GlobalExceptionResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.util.Iterator;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<GlobalExceptionResponse> handleNoSuchElementException(NoSuchElementException e) {
        GlobalExceptionResponse globalExceptionResponse = GlobalExceptionResponse.builder()
                .message(e.getMessage())
                .build();
        return new ResponseEntity<>(globalExceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<GlobalExceptionResponse> handleConstraintViolationException(ConstraintViolationException e) {
        StringBuilder stringBuilder = getExceptionMessages(e);
        GlobalExceptionResponse globalExceptionResponse = GlobalExceptionResponse.builder()
                .message(stringBuilder.toString())
                .build();
        return ResponseEntity.badRequest().body(globalExceptionResponse);
    }

    private StringBuilder getExceptionMessages(ConstraintViolationException e) {
        Iterator<ConstraintViolation<?>> iterator =
                e.getConstraintViolations().iterator();

        StringBuilder stringBuilder = new StringBuilder();
        while (iterator.hasNext()) {
            ConstraintViolation<?> constraintViolation = iterator.next();
            stringBuilder.append(constraintViolation.getMessage())
                    .append(" Value: ")
                    .append(constraintViolation.getInvalidValue());
        }
        return stringBuilder;
    }
}
