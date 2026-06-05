package com.univapp.etudiantservice.repository;

import com.univapp.etudiantservice.entity.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StageRepository extends JpaRepository<Stage, Long> {
    List<Stage> findByEtudiantId(Long etudiantId);
    List<Stage> findByTypeInsertion(Stage.TypeInsertion type);
}