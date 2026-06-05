package com.univapp.etudiantservice.controller;

import com.univapp.etudiantservice.entity.*;
import com.univapp.etudiantservice.service.EtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/etudiants")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EtudiantController {

    private final EtudiantService etudiantService;

    @GetMapping
    public ResponseEntity<List<Etudiant>> getAllEtudiants() {
        return ResponseEntity.ok(etudiantService.getTousEtudiants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> getEtudiantById(@PathVariable Long id) {
        return ResponseEntity.ok(etudiantService.getEtudiantById(id));
    }

    @GetMapping("/ine/{ine}")
    public ResponseEntity<Etudiant> getEtudiantByIne(@PathVariable String ine) {
        return ResponseEntity.ok(etudiantService.getEtudiantByIne(ine));
    }

    @PostMapping
    public ResponseEntity<Etudiant> creerEtudiant(@RequestBody Etudiant etudiant) {
        return ResponseEntity.ok(etudiantService.creerEtudiant(etudiant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etudiant> modifierEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiant) {
        return ResponseEntity.ok(etudiantService.modifierEtudiant(id, etudiant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerEtudiant(@PathVariable Long id) {
        etudiantService.supprimerEtudiant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats/insertion")
    public ResponseEntity<Map<String, Long>> getStatsInsertion() {
        return ResponseEntity.ok(etudiantService.getStatistiquesInsertion());
    }

    @GetMapping("/stages")
    public ResponseEntity<List<Stage>> getAllStages() {
        return ResponseEntity.ok(etudiantService.getTousStages());
    }

    @PostMapping("/stages")
    public ResponseEntity<Stage> creerStage(@RequestBody Stage stage) {
        return ResponseEntity.ok(etudiantService.creerStage(stage));
    }

    @GetMapping("/{id}/stages")
    public ResponseEntity<List<Stage>> getStagesByEtudiant(@PathVariable Long id) {
        return ResponseEntity.ok(etudiantService.getStagesByEtudiant(id));
    }
}