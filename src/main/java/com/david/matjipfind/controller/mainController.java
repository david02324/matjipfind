package com.david.matjipfind.controller;

import com.david.matjipfind.config.auth.dto.SessionUser;
import com.david.matjipfind.domain.user.User;
import com.david.matjipfind.domain.user.UserRepository;
import com.david.matjipfind.domain.user.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class mainController {
    private final HttpSession httpSession;
    private final UserService userService;

    @GetMapping("/")
    public String main(Model model){
        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        if(user != null) {
            model.addAttribute("id",user.getId());
            model.addAttribute("userName", user.getName());
            model.addAttribute("userEmail",user.getEmail());
            if(user.getLast_keyword()!=null)
                model.addAttribute("last_keyword",user.getLast_keyword());
        }
        return "main";
    }

    @PostMapping("keywordData")
    public String getKeywordData(Model model, @RequestParam(value="id") Long id, @RequestParam(value="keyword") String keyword){
        userService.saveKeyword(id,keyword);
        SessionUser user = (SessionUser) httpSession.getAttribute("user");

        model.addAttribute("last_keyword",user.getLast_keyword());
        return "main";
    }
}