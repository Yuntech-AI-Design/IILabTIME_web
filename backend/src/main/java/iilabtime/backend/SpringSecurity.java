package iilabtime.backend;

import iilabtime.backend.Service.UserOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurity {

    @Autowired
    private UserOAuthService userOAuthServicer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(
//                                "/",                         // 首頁
//                                "/swagger-ui/**",           // Swagger UI 頁面
//                                "/api-docs",             // OpenAPI JSON 主路由
//                                "/api-docs/**",          // 可能的子路由
//                                "/swagger-resources/**",    // Swagger 資源
//                                "/webjars/**",              // 靜態 JS/CSS 等
//                                "/favicon.ico"              // 防止 favicon 被攔
//                        ).permitAll()
//                        .anyRequest().authenticated() // 其他都需要登入
//              )
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
