package com.jsp.roam_smart.service.custom_itinerary;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jsp.roam_smart.dto.ItinerarySaveRequestDTO;
import com.jsp.roam_smart.model.Itinerary;
import com.jsp.roam_smart.model.User;

@Service
public interface CustomItinerayService {
    public String getCustomItineray(String place, Long budget, int days, List<String> selectedPlaces);
   // List<Itinerary> getSavedItineraries(User user);
    public ItinerarySaveRequestDTO saveItinerary(ItinerarySaveRequestDTO request);
    public List<Itinerary> getSavedItineraries(String email);
}
