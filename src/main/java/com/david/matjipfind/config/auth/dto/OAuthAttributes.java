package com.david.matjipfind.config.auth.dto;

import com.david.matjipfind.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String,Object> attributes;
    private String nameAttributeKey;
    private Long id;
    private String name;
    private String email;
    private String last_position;
    private String last_keyword;

    @Builder
    public OAuthAttributes(Map<String,Object> attributes,
                           String nameAttributeKey,Long id,
                           String name,
                           String email,String last_position,
                           String last_keyword){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.id = id;
        this.name = name;
        this.email = email;
        this.last_position = last_position;
        this.last_keyword = last_keyword;
    }

    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes) {

        if("naver".equals(registrationId)){
            return ofNaver("id",attributes);
        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String,Object> response = (Map<String,Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("nickname"))
                .email((String) response.get("email"))
                .last_keyword((String) attributes.get("last_keyword"))
                .last_position((String) attributes.get("last_position"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName,Map<String,Object> attributes){
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .last_keyword((String) attributes.get("last_keyword"))
                .last_position((String) attributes.get("last_position"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .build();
    }
}