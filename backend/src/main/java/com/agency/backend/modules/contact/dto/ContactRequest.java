package com.agency.backend.modules.contact.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ContactRequest {

    @NotBlank(message = "name is required")
    @Size(max = 255, message = "name must not exceed 255 characters")
    private String name;

    @Email(message = "must be a valid email address")
    @NotBlank(message = "email is required")
    private String email;

    @Size(max = 255, message = "company must not exceed 255 characters")
    private String company;

    @Pattern(regexp = "^[+]?[\\d\\s\\-().]{0,50}$", message = "must be a valid phone number")
    private String phone;

    @NotBlank(message = "service is required")
    private String service;

    private String budget;

    @NotBlank(message = "message is required")
    @Size(min = 10, max = 5000, message = "message must be between 10 and 5000 characters")
    private String message;
}
