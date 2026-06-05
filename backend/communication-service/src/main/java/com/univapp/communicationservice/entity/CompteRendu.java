package com.univapp.communicationservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comptes_rendus")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompteRendu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    @Enumerated(EnumType.STRING)
    private TypeInstance typeInstance;

    private String auteur;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @Column(name = "est_publie")
    private boolean estPublie = false;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
    }

    public enum TypeInstance {
        REUNION, RENCONTRE, SEMINAIRE, WEBINAIRE, CONSEIL_UNIVERSITE
    }
}