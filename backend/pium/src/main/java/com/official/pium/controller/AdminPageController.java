package com.official.pium.controller;

import com.official.pium.domain.Admin;
import com.official.pium.domain.AdminAuth;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.service.AdminService;
import com.official.pium.service.dto.AdminLoginRequest;
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

    private static final String REDIRECT_ADMIN_LOGIN = "redirect:/admin/login";

    private final DictionaryPlantRepository dictionaryPlantRepository;
    private final AdminService adminService;

    @GetMapping("/**")
    public String adminPage(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        model.addAttribute("admin", admin);
        return "/admin/index";
    }

    @GetMapping("/dict")
    public String dictionaryPlants(@PageableDefault Pageable pageable, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        Page<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findAll(pageable);
        model.addAttribute("admin", admin);
        model.addAttribute("page", dictionaryPlants);
        model.addAttribute("plants", dictionaryPlants.getContent());
        return "/admin/dict/list";
    }

    @GetMapping("/dict/{id}")
    public String dictionaryPlant(@PathVariable Long id, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 사전 식물이 존재하지 않습니다. id:" + id));

        model.addAttribute("admin", admin);
        model.addAttribute("plant", dictionaryPlant);
        return "/admin/dict/plant";
    }

    @GetMapping("/dict/create")
    public String dictionaryPlantCreateForm(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/create";
    }

    @GetMapping("/dict/{id}/update")
    public String dictionaryPlantUpdateForm(@PathVariable Long id, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 사전 식물이 존재하지 않습니다. id:" + id));

        model.addAttribute("admin", admin);
        model.addAttribute("plant", dictionaryPlant);
        return "/admin/dict/update";
    }

    @GetMapping("/dict/requests")
    public String dictionaryPlantRequests(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return REDIRECT_ADMIN_LOGIN;
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/requests";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        return "/admin/login";
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
