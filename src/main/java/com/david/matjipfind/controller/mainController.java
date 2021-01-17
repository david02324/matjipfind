package com.david.matjipfind.controller;

import com.david.matjipfind.config.auth.dto.SessionUser;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class mainController {
    private final HttpSession httpSession;

    @GetMapping("/")
    public String main(Model model){
        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null) {
            model.addAttribute("userName", user.getName());
        }
        return "main";
    }
}