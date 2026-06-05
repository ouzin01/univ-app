package com.univapp.etudiantservice.service;

import com.univapp.etudiantservice.entity.*;
import com.univapp.etudiantservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class EtudiantService {

    private final EtudiantRepository etudiantRepository;
    private final StageRepository stageRepository;

    public Etudiant creerEtudiant(Etudiant etudiant) {
        if (etudiantRepository.findByIne(etudiant.getIne()).isPresent()) {
            throw new RuntimeException("INE déjà utilisé");
        }
        return etudiantRepository.save(etudiant);
    }

    public List<Etudiant> getTousEtudiants() {
        return etudiantRepository.findAll();
    }

    public Etudiant getEtudiantById(Long id) {
        return etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Etudiant introuvable"));
    }

    public Etudiant getEtudiantByIne(String ine) {
        return etudiantRepository.findByIne(ine)
                .orElseThrow(() -> new RuntimeException("Etudiant introuvable"));
    }

    public Etudiant modifierEtudiant(Long id, Etudiant etudiant) {
        etudiant.setId(id);
        return etudiantRepository.save(etudiant);
    }

    public void supprimerEtudiant(Long id) {
        etudiantRepository.deleteById(id);
    }

    public Map<String, Long> getStatistiquesInsertion() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("autoEmploi", (long) stageRepository.findByTypeInsertion(Stage.TypeInsertion.AUTO_EMPLOI).size());
        stats.put("emploiSalarie", (long) stageRepository.findByTypeInsertion(Stage.TypeInsertion.EMPLOI_SALARIE).size());
        stats.put("enCours", (long) stageRepository.findByTypeInsertion(Stage.TypeInsertion.EN_COURS).size());
        return stats;
    }

    public Stage creerStage(Stage stage) {
        return stageRepository.save(stage);
    }

    public List<Stage> getTousStages() {
        return stageRepository.findAll();
    }

    public List<Stage> getStagesByEtudiant(Long etudiantId) {
        return stageRepository.findByEtudiantId(etudiantId);
    }
}