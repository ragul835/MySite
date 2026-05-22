package com.agency.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        long start = System.currentTimeMillis();
        try {
            filterChain.doFilter(request, response);
        } finally {
            long ms = System.currentTimeMillis() - start;
            int status = response.getStatus();
            String method = request.getMethod();
            String uri = request.getRequestURI();
            String query = request.getQueryString();
            String full = query != null ? uri + "?" + query : uri;

            if (status >= 500) {
                log.error("{} {} → {} ({}ms)", method, full, status, ms);
            } else if (status >= 400) {
                log.warn("{} {} → {} ({}ms)", method, full, status, ms);
            } else {
                log.info("{} {} → {} ({}ms)", method, full, status, ms);
            }
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.contains("/swagger-ui")
                || uri.contains("/v3/api-docs")
                || uri.contains("/swagger-resources")
                || uri.contains("/webjars");
    }
}
