package com.univapp.administrationservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "budgets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String intitule;

    private BigDecimal montantPrevisionnel;
    private BigDecimal montantRealise;

    private String anneeExercice;

    @Enumerated(EnumType.STRING)
    private StatutBudget statut;

    @Column(columnDefinition = "TEXT")
    private String noteOrientation;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
    }

    public enum StatutBudget {
        PREVISIONNEL, REALISE, EN_COURS
    }
}