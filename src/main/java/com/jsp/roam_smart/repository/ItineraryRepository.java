package com.jsp.roam_smart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jsp.roam_smart.model.Itinerary;
import com.jsp.roam_smart.model.User;

public interface ItineraryRepository extends JpaRepository<Itinerary,Long> {
    List<Itinerary> findByUser(User user);
    
}
