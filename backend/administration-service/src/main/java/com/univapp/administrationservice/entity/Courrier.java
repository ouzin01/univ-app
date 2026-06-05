package com.univapp.administrationservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "courriers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Courrier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String objet;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    private String expediteur;
    private String destinataire;

    @Enumerated(EnumType.STRING)
    private TypeCourrier type;

    @Column(name = "date_reception")
    private LocalDateTime dateReception;

    @Column(name = "est_traite")
    private boolean estTraite = false;

    @PrePersist
    public void prePersist() {
        this.dateReception = LocalDateTime.now();
    }

    public enum TypeCourrier {
        ARRIVE, DEPART
    }
}