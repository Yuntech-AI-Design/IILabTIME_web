package iilabtime.backend;

import iilabtime.backend.Service.UserOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

    @Autowired
    private UserOAuthService userOAuthServicer;

    @Value("${LOGIN_PATH}")
    private String loginPath;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println(loginPath);
        http
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        //.requestMatchers("/auth/api/**").authenticated() // 必須登入後才能訪問的路徑
                        .anyRequest().permitAll() // 其他都於須
              )
                //.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth ->{
                            oauth.userInfoEndpoint(info -> info.userService(userOAuthServicer));
                            oauth.defaultSuccessUrl(loginPath,true);
                        }

                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/")               // 登出後回首頁
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                );

        return http.build();
    }
}
