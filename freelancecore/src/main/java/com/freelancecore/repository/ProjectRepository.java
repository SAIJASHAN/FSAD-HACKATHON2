package com.freelancecore.repository;

import com.freelancecore.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // Search & Filter Module - search by client name
    Page<Project> findByClientNameContainingIgnoreCase(String clientName, Pageable pageable);

    // Search & Filter Module - filter by status
    Page<Project> findByStatus(String status, Pageable pageable);

    // Search & Filter Module - search by client OR status
    Page<Project> findByClientNameContainingIgnoreCaseAndStatus(String clientName, String status, Pageable pageable);

    // Analytics Module - count by status
    long countByStatus(String status);

    // Analytics Module - total count
    @Query("SELECT COUNT(p) FROM Project p")
    long countAllProjects();
}
