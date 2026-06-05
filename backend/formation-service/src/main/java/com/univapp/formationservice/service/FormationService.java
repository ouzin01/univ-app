package com.univapp.formationservice.service;

import com.univapp.formationservice.entity.*;
import com.univapp.formationservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FormationService {

    private final FormationRepository formationRepository;
    private final FormateurRepository formateurRepository;
    private final EmploiDuTempsRepository emploiDuTempsRepository;

    // Formations
    public Formation creerFormation(Formation formation) {
        return formationRepository.save(formation);
    }

    public List<Formation> getToutesFormations() {
        return formationRepository.findAll();
    }

    public Formation getFormationById(Long id) {
        return formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation introuvable"));
    }

    public Formation modifierFormation(Long id, Formation formation) {
        formation.setId(id);
        return formationRepository.save(formation);
    }

    public void supprimerFormation(Long id) {
        formationRepository.deleteById(id);
    }

    // Formateurs
    public Formateur creerFormateur(Formateur formateur) {
        return formateurRepository.save(formateur);
    }

    public List<Formateur> getTousFormateurs() {
        return formateurRepository.findAll();
    }

    public List<Formateur> getFormateursByType(Formateur.TypeFormateur type) {
        return formateurRepository.findByTypeFormateur(type);
    }

    // Emploi du temps
    public EmploiDuTemps creerEmploiDuTemps(EmploiDuTemps emploi) {
        return emploiDuTempsRepository.save(emploi);
    }

    public List<EmploiDuTemps> getTousEmplois() {
        return emploiDuTempsRepository.findAll();
    }

    public List<EmploiDuTemps> getEmploisByFormation(Long formationId) {
        return emploiDuTempsRepository.findByFormationId(formationId);
    }
}