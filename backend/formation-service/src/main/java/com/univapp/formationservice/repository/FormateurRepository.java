package com.univapp.formationservice.repository;

import com.univapp.formationservice.entity.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FormateurRepository extends JpaRepository<Formateur, Long> {
    List<Formateur> findByTypeFormateur(Formateur.TypeFormateur type);
}