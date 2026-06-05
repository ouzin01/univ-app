package com.univapp.formationservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "formations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String intitule;

    private String description;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Enumerated(EnumType.STRING)
    private TypeFormation typeFormation;

    private String niveauEtudes;

    private BigDecimal montantFinancement;

    @Enumerated(EnumType.STRING)
    private TypeFinancement typeFinancement;

    @Column(name = "nb_apprenants_hommes")
    private Integer nbApprenantsHommes = 0;

    @Column(name = "nb_apprenantes_femmes")
    private Integer nbApprenantsFemmes = 0;

    @Column(name = "responsable_formation")
    private String responsableFormation;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
    }

    public enum TypeFormation {
        INITIALE, CONTINUE, CERTIFICATION, PRIVEE
    }

    public enum TypeFinancement {
        PUBLIC, PRIVE, MIXTE, BOURSE
    }
}