package com.david.matjipfind.config.auth.dto;
import com.david.matjipfind.domain.user.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private Long id;
    private String name;
    private String email;
    private String last_position;
    private String last_keyword;

    public SessionUser(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.last_position = user.getLast_position();
        this.last_keyword = user.getLast_keyword();
    }
}
