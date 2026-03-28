package com.freelancecore.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Client name is required")
    @Column(nullable = false)
    private String clientName;

    @NotBlank(message = "Project title is required")
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Values: "Not Started", "In Progress", "Completed"
    @Column(nullable = false)
    private String status = "Not Started";

    @NotNull(message = "Deadline is required")
    private LocalDate deadline;

    private Double budget;
}
