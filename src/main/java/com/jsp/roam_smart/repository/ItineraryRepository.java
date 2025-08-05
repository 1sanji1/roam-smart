package com.jsp.roam_smart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.roam_smart.model.Itinerary;

public interface ItineraryRepository extends JpaRepository<Itinerary,Long> {
    
}
