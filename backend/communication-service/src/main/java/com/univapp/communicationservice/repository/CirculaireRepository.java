package com.univapp.communicationservice.repository;

import com.univapp.communicationservice.entity.Circulaire;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CirculaireRepository extends JpaRepository<Circulaire, Long> {
    List<Circulaire> findByEstPublieTrue();
    List<Circulaire> findByDestinataire(Circulaire.TypeDestinataire destinataire);
}