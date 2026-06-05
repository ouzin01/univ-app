package com.univapp.formationservice.repository;

import com.univapp.formationservice.entity.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    List<Formation> findByTypeFormation(Formation.TypeFormation type);
    List<Formation> findByResponsableFormation(String responsable);
}