package com.official.pium.controller;

import com.official.pium.exception.dto.GlobalExceptionResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.StringJoiner;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String JOINER_DELIMITER = ", ";

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode status,
                                                                  WebRequest request) {
        List<ObjectError> allErrors = ex.getBindingResult().getAllErrors();
        StringJoiner stringJoiner = new StringJoiner(JOINER_DELIMITER);

        for (ObjectError error : allErrors) {
            stringJoiner.add(error.getDefaultMessage());
        }

        GlobalExceptionResponse globalExceptionResponse = createExceptionResponse(stringJoiner.toString());
        return ResponseEntity.badRequest().body(globalExceptionResponse);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GlobalExceptionResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(e.getMessage());
        return ResponseEntity.badRequest().body(exceptionResponse);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<GlobalExceptionResponse> handleNoSuchElementException(NoSuchElementException e) {
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(e.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<GlobalExceptionResponse> handleConstraintViolationException(ConstraintViolationException e) {
        StringBuilder stringBuilder = getExceptionMessages(e);
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(stringBuilder.toString());
        return ResponseEntity.badRequest().body(exceptionResponse);
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

    private GlobalExceptionResponse createExceptionResponse(String message) {
        return GlobalExceptionResponse.builder()
                .message(message)
                .build();
    }
}
