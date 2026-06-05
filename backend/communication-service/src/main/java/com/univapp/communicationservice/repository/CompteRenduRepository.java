package com.univapp.communicationservice.repository;

import com.univapp.communicationservice.entity.CompteRendu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompteRenduRepository extends JpaRepository<CompteRendu, Long> {
    List<CompteRendu> findByEstPublieTrue();
    List<CompteRendu> findByTypeInstance(CompteRendu.TypeInstance typeInstance);
}