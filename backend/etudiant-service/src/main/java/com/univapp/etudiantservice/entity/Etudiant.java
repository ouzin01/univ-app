package com.univapp.etudiantservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "etudiants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String ine;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    private String email;
    private String telephone;
    private String formation;
    private String promotion;

    @Column(name = "annee_debut")
    private Integer anneeDebut;

    @Column(name = "annee_sortie")
    private Integer anneeSortie;

    @Column(columnDefinition = "TEXT")
    private String diplomesObtenus;

    @Column(columnDefinition = "TEXT")
    private String autresFormations;

    @Enumerated(EnumType.STRING)
    private StatutEtudiant statut;

    @Column(name = "date_inscription")
    private LocalDateTime dateInscription;

    @PrePersist
    public void prePersist() {
        this.dateInscription = LocalDateTime.now();
    }

    public enum StatutEtudiant {
        ACTIF, DIPLOME, ABANDONNE, SUSPENDU
    }
}