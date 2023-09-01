package com.official.pium.controller;

import com.official.pium.annotation.AdminAuth;
import com.official.pium.domain.Admin;
import com.official.pium.service.AdminService;
import com.official.pium.service.DictionaryPlantService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class AdminPageController {

    private final DictionaryPlantService dictionaryPlantService;
    private final AdminService adminService;

    @GetMapping("/admin")
    public String adminPage(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/index";
    }

    @GetMapping("/admin/dict/post")
    public String dictionaryPlantForm(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/post";
    }

    @GetMapping("/admin/dict/list")
    public String dictionaryPlantList(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/list";
    }

    @GetMapping("/admin/dict/requests")
    public String dictionaryPlantRequests(@AdminAuth Admin admin, Model model) {
        if (admin == null) {
            return "redirect:/admin/login";
        }

        model.addAttribute("admin", admin);
        return "/admin/dict/requests";
    }

    @GetMapping("/admin/login")
    public String loginPage(Model model) {
        model.addAttribute("admin", new Admin());
        return "/admin/login";
    }

    @PostMapping("/admin/login")
    public String login(@ModelAttribute("admin") Admin admin, HttpSession httpSession) {
        adminService.login(admin, httpSession);
        return "redirect:/admin";
    }
}
