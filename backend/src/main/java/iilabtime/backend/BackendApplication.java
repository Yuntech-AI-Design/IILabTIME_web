package iilabtime.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {


    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("backend").filename(".env").ignoreIfMissing().load();
        dotenv.entries().forEach(entry ->
                System.setProperty(entry.getKey(), entry.getValue())
        );
        System.out.println(".env file load");
        System.out.println("📦 以下是從 .env 載入的變數：");
        dotenv.entries().forEach(entry -> {
            System.out.println(entry.getKey() + "=" + entry.getValue());
        });
        SpringApplication.run(BackendApplication.class, args);
    }

}
