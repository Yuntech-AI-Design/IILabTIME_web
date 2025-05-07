package iilabtime.backend;

import iilabtime.backend.Service.UserOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurity {

    @Autowired
    private UserOAuthService userOAuthServicer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        //.requestMatchers("/auth/api/**").authenticated() // 必須登入後才能訪問的路徑
                        .anyRequest().permitAll() // 其他都於須
              )
                //.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth ->
                        oauth.userInfoEndpoint(info -> info.userService(userOAuthServicer))
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/")               // 登出後回首頁
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                );

        return http.build();
    }
}
