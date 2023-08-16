package com.official.pium.controller;

import com.official.pium.exception.OAuthException;
import com.official.pium.exception.OAuthException.KaKaoMemberInfoRequestException;
import com.official.pium.exception.OAuthException.KakaoServerException;
import com.official.pium.exception.OAuthException.KakaoTokenRequestException;
import com.official.pium.exception.dto.GlobalExceptionResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.StringJoiner;
import javax.naming.AuthenticationException;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String SERVER_ERROR_MESSAGE = "서버에서 오류가 발생했습니다.";
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

        String message = stringJoiner.toString();
        GlobalExceptionResponse globalExceptionResponse = createExceptionResponse(message);
        log.info(message);
        return ResponseEntity.badRequest().body(globalExceptionResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GlobalExceptionResponse> handleException(Exception e) {
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(SERVER_ERROR_MESSAGE);
        log.error(SERVER_ERROR_MESSAGE, e);
        return ResponseEntity.internalServerError().body(exceptionResponse);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<GlobalExceptionResponse> handleIllegalStateException(IllegalStateException e) {
        String message = e.getMessage();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(message);
        log.error(message, e);
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({KakaoTokenRequestException.class, KaKaoMemberInfoRequestException.class})
    public ResponseEntity<GlobalExceptionResponse> handleOAuthRequestException(OAuthException e) {
        String message = e.getMessage();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(message);
        log.info(message);
        return ResponseEntity.badRequest().body(exceptionResponse);
    }

    @ExceptionHandler(KakaoServerException.class)
    public ResponseEntity<GlobalExceptionResponse> handleOAuthServerException(OAuthException e) {
        String message = e.getMessage();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(e.getMessage());
        log.info(message);
        return ResponseEntity.internalServerError().body(exceptionResponse);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<GlobalExceptionResponse> handleAuthenticationException(AuthenticationException e) {
        String message = e.getMessage();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(message);
        log.info(message);
        return new ResponseEntity<>(exceptionResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GlobalExceptionResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        String message = e.getMessage();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(message);
        log.info(message);
        return ResponseEntity.badRequest().body(exceptionResponse);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<GlobalExceptionResponse> handleNoSuchElementException(NoSuchElementException e) {
        String message = e.getMessage();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(message);
        log.warn(message);
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<GlobalExceptionResponse> handleConstraintViolationException(ConstraintViolationException e) {
        StringBuilder stringBuilder = getExceptionMessages(e);
        String message = stringBuilder.toString();
        GlobalExceptionResponse exceptionResponse = createExceptionResponse(message);
        log.info(message);
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
