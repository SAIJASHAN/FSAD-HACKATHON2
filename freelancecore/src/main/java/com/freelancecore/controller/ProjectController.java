package com.freelancecore.controller;

import com.freelancecore.model.Project;
import com.freelancecore.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*") // Allows React frontend to connect
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // ============================
    // CORE MANAGEMENT MODULE
    // ============================

    // POST /api/projects  -> Create a new project
    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        Project created = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // GET /api/projects/{id}  -> Get project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    // PUT /api/projects/{id}  -> Update a project
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id,
                                                  @Valid @RequestBody Project project) {
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }

    // DELETE /api/projects/{id}  -> Delete a project
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully");
    }

    // ============================
    // PAGINATION & SORTING MODULE
    // ============================

    // GET /api/projects?page=0&size=10&sortBy=id
    @GetMapping
    public ResponseEntity<Page<Project>> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        return ResponseEntity.ok(projectService.getAllProjects(page, size, sortBy));
    }

    // ============================
    // SEARCH & FILTER MODULE
    // ============================

    // GET /api/projects/search?client=John&page=0&size=10
    @GetMapping("/search")
    public ResponseEntity<Page<Project>> searchByClient(
            @RequestParam String client,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(projectService.searchByClient(client, page, size));
    }

    // GET /api/projects/filter?status=In Progress
    @GetMapping("/filter")
    public ResponseEntity<Page<Project>> filterByStatus(
            @RequestParam String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(projectService.filterByStatus(status, page, size));
    }

    // ============================
    // ANALYTICS MODULE
    // ============================

    // GET /api/projects/analytics  -> Get project counts
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Long>> getAnalytics() {
        return ResponseEntity.ok(projectService.getProjectAnalytics());
    }
}
