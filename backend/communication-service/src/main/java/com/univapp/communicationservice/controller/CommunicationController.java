package com.univapp.communicationservice.controller;

import com.univapp.communicationservice.entity.Circulaire;
import com.univapp.communicationservice.entity.CompteRendu;
import com.univapp.communicationservice.service.CommunicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/communication")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CommunicationController {

    private final CommunicationService communicationService;

    // Comptes Rendus
    @GetMapping("/comptes-rendus")
    public ResponseEntity<List<CompteRendu>> getAllComptesRendus() {
        return ResponseEntity.ok(communicationService.getTousComptesRendus());
    }

    @GetMapping("/comptes-rendus/publies")
    public ResponseEntity<List<CompteRendu>> getComptesRendusPublies() {
        return ResponseEntity.ok(communicationService.getComptesRendusPublies());
    }

    @PostMapping("/comptes-rendus")
    public ResponseEntity<CompteRendu> creerCompteRendu(@RequestBody CompteRendu compteRendu) {
        return ResponseEntity.ok(communicationService.creerCompteRendu(compteRendu));
    }

    @PutMapping("/comptes-rendus/{id}/publier")
    public ResponseEntity<CompteRendu> publierCompteRendu(@PathVariable Long id) {
        return ResponseEntity.ok(communicationService.publierCompteRendu(id));
    }

    @DeleteMapping("/comptes-rendus/{id}")
    public ResponseEntity<Void> supprimerCompteRendu(@PathVariable Long id) {
        communicationService.supprimerCompteRendu(id);
        return ResponseEntity.noContent().build();
    }

    // Circulaires
    @GetMapping("/circulaires")
    public ResponseEntity<List<Circulaire>> getAllCirculaires() {
        return ResponseEntity.ok(communicationService.getToutesCirculaires());
    }

    @PostMapping("/circulaires")
    public ResponseEntity<Circulaire> creerCirculaire(@RequestBody Circulaire circulaire) {
        return ResponseEntity.ok(communicationService.creerCirculaire(circulaire));
    }

    @PutMapping("/circulaires/{id}/publier")
    public ResponseEntity<Circulaire> publierCirculaire(@PathVariable Long id) {
        return ResponseEntity.ok(communicationService.publierCirculaire(id));
    }
}