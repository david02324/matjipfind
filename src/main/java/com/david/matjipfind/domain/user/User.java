package com.david.matjipfind.domain.user;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String last_position;
    private String last_keyword;

    @Builder
    public User(String name,String email){
        this.name = name;
        this.email = email;
    }
}
