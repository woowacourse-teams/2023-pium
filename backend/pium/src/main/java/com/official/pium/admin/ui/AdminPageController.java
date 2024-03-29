package com.official.pium.admin.ui;

import com.official.pium.admin.domain.Admin;
import com.official.pium.admin.domain.Registration;
import com.official.pium.admin.repository.RegistrationRepository;
import com.official.pium.admin.service.AdminService;
import com.official.pium.admin.service.dto.AdminLoginRequest;
import com.official.pium.admin.service.dto.AdminSendNotificationRequest;
import com.official.pium.dictionaryPlant.domain.DictionaryPlant;
import com.official.pium.dictionaryPlant.repository.DictionaryPlantRepository;
import com.official.pium.member.domain.Member;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.notification.application.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Validated
@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminPageController {

    private static final String ADMIN_FIELD = "admin";
    private static final String REDIRECT_ADMIN_LOGIN = "redirect:/admin/login";

    private final RegistrationRepository registrationRepository;
    private final DictionaryPlantRepository dictionaryPlantRepository;
    private final MemberRepository memberRepository;
    private final AdminService adminService;
    private final NotificationService notificationService;

    @GetMapping("/**")
    public String adminPage(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        model.addAttribute(ADMIN_FIELD, admin);
        return "admin/index";
    }

    @GetMapping("/dict")
    public String dictionaryPlants(@PageableDefault Pageable pageable, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        Page<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findAll(pageable);
        model.addAttribute(ADMIN_FIELD, admin);
        model.addAttribute("page", dictionaryPlants);
        model.addAttribute("plants", dictionaryPlants.getContent());
        return "admin/dict/list";
    }

    @GetMapping("/dict/{id}")
    public String dictionaryPlant(@PathVariable Long id, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 사전 식물이 존재하지 않습니다. id:" + id));

        model.addAttribute(ADMIN_FIELD, admin);
        model.addAttribute("plant", dictionaryPlant);
        return "admin/dict/plant";
    }

    @GetMapping("/dict/create")
    public String dictionaryPlantCreateForm(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        model.addAttribute(ADMIN_FIELD, admin);
        return "admin/dict/create";
    }

    @GetMapping("/dict/{id}/update")
    public String dictionaryPlantUpdateForm(@PathVariable Long id, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 사전 식물이 존재하지 않습니다. id:" + id));

        model.addAttribute(ADMIN_FIELD, admin);
        model.addAttribute("plant", dictionaryPlant);
        return "admin/dict/update";
    }

    @GetMapping("/dict/requests")
    public String dictionaryPlantRequests(@PageableDefault Pageable pageable, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        Page<Registration> registrations = registrationRepository.findAll(pageable);
        model.addAttribute(ADMIN_FIELD, admin);
        model.addAttribute("page", registrations);
        model.addAttribute("registrations", registrations.getContent());
        return "admin/dict/requests";
    }

    @GetMapping("/member/requests")
    public String membersPage(@PageableDefault Pageable pageable, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }
        Page<Member> members = memberRepository.findAll(pageable);
        model.addAttribute(ADMIN_FIELD, admin);
        model.addAttribute("page", members);
        model.addAttribute("members", members.getContent());
        return "admin/member/requests";
    }

    @PostMapping("/notification")
    public ResponseEntity<Void> sendNotification(@AdminAuth Admin admin,
                                                 @RequestBody @Valid AdminSendNotificationRequest request) {
        if (admin == null) {
            return ResponseEntity.status(401).build();
        }

        notificationService.sendNotification(request.getDeviceToken(), request.getTitle(), request.getBody());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        return "admin/login";
    }

    @PostMapping("/login")
    public String login(@RequestBody @Valid AdminLoginRequest admin, HttpSession httpSession) {
        adminService.login(admin, httpSession);
        return "redirect:/admin";
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }
}
