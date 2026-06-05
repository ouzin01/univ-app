package com.univapp.administrationservice.service;

import com.univapp.administrationservice.entity.*;
import com.univapp.administrationservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdministrationService {

    private final CourrierRepository courrierRepository;
    private final NoteServiceRepository noteServiceRepository;
    private final BudgetRepository budgetRepository;

    // Courriers
    public Courrier creerCourrier(Courrier courrier) {
        return courrierRepository.save(courrier);
    }

    public List<Courrier> getTousCourriers() {
        return courrierRepository.findAll();
    }

    public List<Courrier> getCourriersByType(Courrier.TypeCourrier type) {
        return courrierRepository.findByType(type);
    }

    public Courrier traiterCourrier(Long id) {
        Courrier c = courrierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Courrier introuvable"));
        c.setEstTraite(true);
        return courrierRepository.save(c);
    }

    // Notes de service
    public NoteDeService creerNote(NoteDeService note) {
        return noteServiceRepository.save(note);
    }

    public List<NoteDeService> getToutesNotes() {
        return noteServiceRepository.findAll();
    }

    // Budget
    public Budget creerBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getTousBudgets() {
        return budgetRepository.findAll();
    }

    public List<Budget> getBudgetsByAnnee(String annee) {
        return budgetRepository.findByAnneeExercice(annee);
    }
} 