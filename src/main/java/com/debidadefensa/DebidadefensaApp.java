package com.debidadefensa;

import com.debidadefensa.config.ApplicationProperties;
import com.debidadefensa.config.DefaultProfileUtil;
import com.debidadefensa.service.FechasServicioService;
import com.debidadefensa.service.impl.FechasServicioServiceImpl;

import io.github.jhipster.config.JHipsterConstants;

import org.elasticsearch.common.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collection;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

@ComponentScan
@EnableAutoConfiguration(exclude = {MetricFilterAutoConfiguration.class, MetricRepositoryAutoConfiguration.class})
@EnableConfigurationProperties({LiquibaseProperties.class, ApplicationProperties.class})
public class DebidadefensaApp {

    private static final Logger log = LoggerFactory.getLogger(DebidadefensaApp.class);

    private final Environment env;
    public final FechasServicioService fechasServicioService;
    
    public DebidadefensaApp(Environment env,
                            FechasServicioService fechasServicioService) {
        this.env = env;        
        this.fechasServicioService = fechasServicioService;
    }

    /**
     * Initializes debidadefensa.
     * <p>
     * Spring profiles can be configured with a program arguments --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="http://www.jhipster.tech/profiles/">http://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error("You have misconfigured your application! It should not run " +
                "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)) {
            log.error("You have misconfigured your application! It should not " +
                "run with both the 'dev' and 'cloud' profiles at the same time.");
        }        
    }

    public String instanceMethod()
    {
        return "instance";
    }


    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     * @throws UnknownHostException if the local host name could not be resolved into an address
     */
    public static void main(String[] args) throws UnknownHostException {

        
        SpringApplication app = new SpringApplication(DebidadefensaApp.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        log.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running! Access URLs:\n\t" +
                "Local: \t\t{}://localhost:{}\n\t" +
                "External: \t{}://{}:{}\n\t" +
                "Profile(s): \t{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            protocol,
            env.getProperty("server.port"),
            protocol,
            InetAddress.getLocalHost().getHostAddress(),
            env.getProperty("server.port"),
            env.getActiveProfiles());
        // And From your main() method or any other method
        Timer timer = new Timer();
        timer.schedule(new TiemerTaskClass(), 0, 60000); //1 Min   
    }    
}

class TiemerTaskClass extends TimerTask {
    @Resource(name = "FechasServicioServiceImpl")
    private FechasServicioService fechas;     
          
    @Override
    public void run() { 
      //  fechas = new ServicioFecha().ObtenServicio(); 
        fechas.ConsultaFechasEmail(new Date().toInstant());          
        System.out.println("Timer task started at:"+new Date());
    }  
} 

class ServicioFecha {
    @Resource
    FechasServicioService fecha;

    /**
     * @return the fecha
     */
    @Resource
    public FechasServicioService getFecha() {
        return fecha;
    }

    /**
     * @param fecha the fecha to set
     */
    @Resource
    public void setFecha(FechasServicioService fecha) {
        this.fecha = fecha;
    }

    public FechasServicioService ObtenServicio(){       
        return this.fecha;
    }
}


