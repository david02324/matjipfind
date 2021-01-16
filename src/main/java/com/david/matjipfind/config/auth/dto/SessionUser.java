package com.david.matjipfind.config.auth.dto;
import com.david.matjipfind.domain.user.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String last_position;
    private String last_keyword;

    public SessionUser(User user){
        this.name = user.getName();
        this.email = user.getEmail();
        String last_position = user.getLast_position();
        String last_keyword = user.getLast_keyword();

        if(last_position!=null){
            this.last_position = last_position;
        }
        if(last_keyword!=null){
            this.last_keyword = last_keyword;
        }
    }
}
