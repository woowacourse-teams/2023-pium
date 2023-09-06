package com.official.pium.controller;

import com.official.pium.annotation.AdminAuth;
import com.official.pium.domain.Admin;
import com.official.pium.domain.DictionaryPlant;
import com.official.pium.repository.DictionaryPlantRepository;
import com.official.pium.service.AdminService;
import jakarta.servlet.http.HttpSession;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminPageController {

    private final DictionaryPlantRepository dictionaryPlantRepository;
    private final AdminService adminService;

    @GetMapping("/**")
    public String adminPage(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/index";
    }

    @GetMapping("/dict")
    public String dictionaryPlantList(@PageableDefault Pageable pageable, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }
        Page<DictionaryPlant> dictionaryPlants = dictionaryPlantRepository.findAll(pageable);

        model.addAttribute("admin", admin);
        model.addAttribute("page", dictionaryPlants);
        model.addAttribute("plants", dictionaryPlants.getContent());
        return "/admin/dict/list";
    }

    @GetMapping("/dict/{id}")
    public String dictionaryPlantList(@PathVariable Long id, @AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        DictionaryPlant dictionaryPlant = dictionaryPlantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("일치하는 사전 식물이 존재하지 않습니다. id:" + id));

        model.addAttribute("admin", admin);
        model.addAttribute("plant", dictionaryPlant);
        return "/admin/dict/plant";
    }

    @GetMapping("/dict/post")
    public String dictionaryPlantCreateForm(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/post";
    }

    @GetMapping("/dict/{id}/update")
    public String dictionaryPlantUpdateForm(@PathVariable Long id,@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
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
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/requests";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("admin", new Admin());
        return "/admin/login";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute("admin") Admin admin, HttpSession httpSession) {
        adminService.login(admin, httpSession);
        return "redirect:/admin";
    }
}
