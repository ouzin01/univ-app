package com.univapp.formationservice.repository;

import com.univapp.formationservice.entity.EmploiDuTemps;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;

public interface EmploiDuTempsRepository extends JpaRepository<EmploiDuTemps, Long> {
    List<EmploiDuTemps> findByDateCours(LocalDate date);
    List<EmploiDuTemps> findByFormationId(Long formationId);
}