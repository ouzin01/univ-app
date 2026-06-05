package com.univapp.administrationservice.repository;

import com.univapp.administrationservice.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByAnneeExercice(String anneeExercice);
    List<Budget> findByStatut(Budget.StatutBudget statut);
}