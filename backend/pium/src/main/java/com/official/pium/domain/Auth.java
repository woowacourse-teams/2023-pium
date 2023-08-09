package com.official.pium.domain;

import static java.lang.annotation.ElementType.PARAMETER;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface Auth {
}
