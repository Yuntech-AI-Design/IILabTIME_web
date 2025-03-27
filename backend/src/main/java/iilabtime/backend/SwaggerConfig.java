package iilabtime.backend;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("我的 API 文件")
                        .version("1.0")
                        .description("這是一個使用 springdoc-openapi-ui 的示範")
                        .contact(new Contact()
                                .name("你的名字")
                                .email("你的email@example.com")
                                .url("https://example.com")));
    }
}
