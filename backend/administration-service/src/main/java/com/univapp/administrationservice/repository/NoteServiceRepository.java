package com.univapp.administrationservice.repository;

import com.univapp.administrationservice.entity.NoteDeService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteServiceRepository extends JpaRepository<NoteDeService, Long> {
    List<NoteDeService> findByType(NoteDeService.TypeNote type);
}