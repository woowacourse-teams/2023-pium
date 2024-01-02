package com.official.pium.config;

import com.official.pium.admin.ui.AdminArgumentResolver;
import com.official.pium.common.ui.MemberArgumentResolver;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.sessionGroup.application.SessionGroupService;
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
