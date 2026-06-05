package com.univapp.communicationservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "circulaires")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Circulaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    private String auteur;

    @Enumerated(EnumType.STRING)
    private TypeDestinataire destinataire;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @Column(name = "est_publie")
    private boolean estPublie = false;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
    }

    public enum TypeDestinataire {
        TOUS, ETUDIANTS, ENSEIGNANTS, ADMINISTRATION
    }
}