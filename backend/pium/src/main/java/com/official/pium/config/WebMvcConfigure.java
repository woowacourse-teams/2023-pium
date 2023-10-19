package com.official.pium.config;

import com.official.pium.admin.controller.AdminArgumentResolver;
import com.official.pium.controller.MemberArgumentResolver;
import com.official.pium.repository.MemberRepository;
import com.official.pium.service.SessionGroupService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfigure implements WebMvcConfigurer {

    private final MemberRepository memberRepository;
    private final SessionGroupService sessionGroupService;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new MemberArgumentResolver(memberRepository, sessionGroupService));
        resolvers.add(new AdminArgumentResolver());
    }
}
