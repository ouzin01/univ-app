package com.univapp.administrationservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notes_service")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteDeService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    private String auteur;

    @Enumerated(EnumType.STRING)
    private TypeNote type;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @PrePersist
    public void prePersist() {
        this.dateCreation = LocalDateTime.now();
    }

    public enum TypeNote {
        INTERNE, EXTERNE, ADMINISTRATIVE
    }
}