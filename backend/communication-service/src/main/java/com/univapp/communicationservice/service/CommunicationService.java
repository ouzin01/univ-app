package com.univapp.communicationservice.service;

import com.univapp.communicationservice.entity.Circulaire;
import com.univapp.communicationservice.entity.CompteRendu;
import com.univapp.communicationservice.repository.CirculaireRepository;
import com.univapp.communicationservice.repository.CompteRenduRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunicationService {

    private final CompteRenduRepository compteRenduRepository;
    private final CirculaireRepository circulaireRepository;

    // Comptes Rendus
    public CompteRendu creerCompteRendu(CompteRendu compteRendu) {
        return compteRenduRepository.save(compteRendu);
    }

    public List<CompteRendu> getTousComptesRendus() {
        return compteRenduRepository.findAll();
    }

    public List<CompteRendu> getComptesRendusPublies() {
        return compteRenduRepository.findByEstPublieTrue();
    }

    public CompteRendu publierCompteRendu(Long id) {
        CompteRendu cr = compteRenduRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compte rendu introuvable"));
        cr.setEstPublie(true);
        return compteRenduRepository.save(cr);
    }

    public void supprimerCompteRendu(Long id) {
        compteRenduRepository.deleteById(id);
    }

    // Circulaires
    public Circulaire creerCirculaire(Circulaire circulaire) {
        return circulaireRepository.save(circulaire);
    }

    public List<Circulaire> getToutesCirculaires() {
        return circulaireRepository.findAll();
    }

    public List<Circulaire> getCirculairesPubliees() {
        return circulaireRepository.findByEstPublieTrue();
    }

    public Circulaire publierCirculaire(Long id) {
        Circulaire c = circulaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Circulaire introuvable"));
        c.setEstPublie(true);
        return circulaireRepository.save(c);
    }
}