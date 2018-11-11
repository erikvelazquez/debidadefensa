package com.debidadefensa.service.impl;

import java.time.LocalDateTime;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.debidadefensa.domain.FechasServicio;
import com.debidadefensa.service.FechasServicioService;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EventCreator {
    private static final Logger LOG = LoggerFactory.getLogger(EventCreator.class);
 
    private final FechasServicioService fechaService;
    public EventCreator(final FechasServicioService fechaService) {
        this.fechaService = fechaService;
    }
    @Scheduled(cron = "0 1 0-23 * * *")
    public void create() {
        this.fechaService.ConsultaFechasEmail();
    }
}