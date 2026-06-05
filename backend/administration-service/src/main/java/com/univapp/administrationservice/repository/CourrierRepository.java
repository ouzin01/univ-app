package com.univapp.administrationservice.repository;

import com.univapp.administrationservice.entity.Courrier;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourrierRepository extends JpaRepository<Courrier, Long> {
    List<Courrier> findByType(Courrier.TypeCourrier type);
    List<Courrier> findByEstTraiteFalse();
}