package com.david.matjipfind.domain.user;

import com.david.matjipfind.config.auth.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final HttpSession httpSession;

    public void saveKeyword(Long id,String keyword) {
        User user = userRepository.getOne(id);
        user.setLast_keyword(keyword);
        userRepository.save(user);
        httpSession.setAttribute("user",new SessionUser(user));
        return;
    }

    public void savePosition(Long id,String position){
        User user = userRepository.getOne(id);
        user.setLast_position(position);
        userRepository.save(user);
        httpSession.setAttribute("user",new SessionUser(user));
        return;
    }
}
