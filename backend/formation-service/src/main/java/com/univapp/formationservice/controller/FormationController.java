package com.univapp.formationservice.controller;

import com.univapp.formationservice.entity.*;
import com.univapp.formationservice.service.FormationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/formations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FormationController {

    private final FormationService formationService;

    // Formations
    @GetMapping
    public ResponseEntity<List<Formation>> getAllFormations() {
        return ResponseEntity.ok(formationService.getToutesFormations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable Long id) {
        return ResponseEntity.ok(formationService.getFormationById(id));
    }

    @PostMapping
    public ResponseEntity<Formation> creerFormation(@RequestBody Formation formation) {
        return ResponseEntity.ok(formationService.creerFormation(formation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formation> modifierFormation(@PathVariable Long id, @RequestBody Formation formation) {
        return ResponseEntity.ok(formationService.modifierFormation(id, formation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerFormation(@PathVariable Long id) {
        formationService.supprimerFormation(id);
        return ResponseEntity.noContent().build();
    }

    // Formateurs
    @GetMapping("/formateurs")
    public ResponseEntity<List<Formateur>> getAllFormateurs() {
        return ResponseEntity.ok(formationService.getTousFormateurs());
    }

    @PostMapping("/formateurs")
    public ResponseEntity<Formateur> creerFormateur(@RequestBody Formateur formateur) {
        return ResponseEntity.ok(formationService.creerFormateur(formateur));
    }

    @GetMapping("/formateurs/type/{type}")
    public ResponseEntity<List<Formateur>> getFormateursByType(@PathVariable Formateur.TypeFormateur type) {
        return ResponseEntity.ok(formationService.getFormateursByType(type));
    }

    // Emploi du temps
    @GetMapping("/emplois-du-temps")
    public ResponseEntity<List<EmploiDuTemps>> getAllEmplois() {
        return ResponseEntity.ok(formationService.getTousEmplois());
    }

    @PostMapping("/emplois-du-temps")
    public ResponseEntity<EmploiDuTemps> creerEmploi(@RequestBody EmploiDuTemps emploi) {
        return ResponseEntity.ok(formationService.creerEmploiDuTemps(emploi));
    }

    @GetMapping("/emplois-du-temps/formation/{id}")
    public ResponseEntity<List<EmploiDuTemps>> getEmploisByFormation(@PathVariable Long id) {
        return ResponseEntity.ok(formationService.getEmploisByFormation(id));
    }
}