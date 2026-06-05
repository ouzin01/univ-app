package com.univapp.administrationservice.controller;

import com.univapp.administrationservice.entity.*;
import com.univapp.administrationservice.service.AdministrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/administration")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdministrationController {

    private final AdministrationService administrationService;

    // Courriers
    @GetMapping("/courriers")
    public ResponseEntity<List<Courrier>> getAllCourriers() {
        return ResponseEntity.ok(administrationService.getTousCourriers());
    }

    @GetMapping("/courriers/type/{type}")
    public ResponseEntity<List<Courrier>> getCourriersByType(@PathVariable Courrier.TypeCourrier type) {
        return ResponseEntity.ok(administrationService.getCourriersByType(type));
    }

    @PostMapping("/courriers")
    public ResponseEntity<Courrier> creerCourrier(@RequestBody Courrier courrier) {
        return ResponseEntity.ok(administrationService.creerCourrier(courrier));
    }

    @PutMapping("/courriers/{id}/traiter")
    public ResponseEntity<Courrier> traiterCourrier(@PathVariable Long id) {
        return ResponseEntity.ok(administrationService.traiterCourrier(id));
    }

    // Notes de service
    @GetMapping("/notes")
    public ResponseEntity<List<NoteDeService>> getAllNotes() {
        return ResponseEntity.ok(administrationService.getToutesNotes());
    }

    @PostMapping("/notes")
    public ResponseEntity<NoteDeService> creerNote(@RequestBody NoteDeService note) {
        return ResponseEntity.ok(administrationService.creerNote(note));
    }

    // Budget
    @GetMapping("/budgets")
    public ResponseEntity<List<Budget>> getAllBudgets() {
        return ResponseEntity.ok(administrationService.getTousBudgets());
    }

    @PostMapping("/budgets")
    public ResponseEntity<Budget> creerBudget(@RequestBody Budget budget) {
        return ResponseEntity.ok(administrationService.creerBudget(budget));
    }

    @GetMapping("/budgets/annee/{annee}")
    public ResponseEntity<List<Budget>> getBudgetsByAnnee(@PathVariable String annee) {
        return ResponseEntity.ok(administrationService.getBudgetsByAnnee(annee));
    }
}