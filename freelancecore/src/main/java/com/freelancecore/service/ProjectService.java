package com.freelancecore.service;

import com.freelancecore.exception.ProjectNotFoundException;
import com.freelancecore.model.Project;
import com.freelancecore.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    // ============================
    // CORE MANAGEMENT MODULE
    // ============================

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ProjectNotFoundException(id));
    }

    public Project updateProject(Long id, Project updatedProject) {
        Project existing = getProjectById(id);
        existing.setClientName(updatedProject.getClientName());
        existing.setTitle(updatedProject.getTitle());
        existing.setDescription(updatedProject.getDescription());
        existing.setStatus(updatedProject.getStatus());
        existing.setDeadline(updatedProject.getDeadline());
        existing.setBudget(updatedProject.getBudget());
        return projectRepository.save(existing);
    }

    public void deleteProject(Long id) {
        getProjectById(id); // throws 404 if not found
        projectRepository.deleteById(id);
    }

    // ============================
    // PAGINATION & SORTING MODULE
    // ============================

    public Page<Project> getAllProjects(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        return projectRepository.findAll(pageable);
    }

    // ============================
    // SEARCH & FILTER MODULE
    // ============================

    public Page<Project> searchByClient(String clientName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectRepository.findByClientNameContainingIgnoreCase(clientName, pageable);
    }

    public Page<Project> filterByStatus(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectRepository.findByStatus(status, pageable);
    }

    public Page<Project> searchByClientAndStatus(String clientName, String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectRepository.findByClientNameContainingIgnoreCaseAndStatus(clientName, status, pageable);
    }

    // ============================
    // ANALYTICS MODULE
    // ============================

    public Map<String, Long> getProjectAnalytics() {
        Map<String, Long> analytics = new LinkedHashMap<>();
        analytics.put("totalProjects", projectRepository.count());
        analytics.put("notStarted", projectRepository.countByStatus("Not Started"));
        analytics.put("inProgress", projectRepository.countByStatus("In Progress"));
        analytics.put("completed", projectRepository.countByStatus("Completed"));
        return analytics;
    }
}
