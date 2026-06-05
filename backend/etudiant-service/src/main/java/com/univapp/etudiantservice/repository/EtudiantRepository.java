package com.univapp.etudiantservice.repository;

import com.univapp.etudiantservice.entity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    Optional<Etudiant> findByIne(String ine);
    List<Etudiant> findByFormation(String formation);
    List<Etudiant> findByPromotion(String promotion);
    List<Etudiant> findByStatut(Etudiant.StatutEtudiant statut);
}