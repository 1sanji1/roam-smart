package com.jsp.roam_smart.controller;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jsp.roam_smart.dto.ItineraryRequestDTO;
import com.jsp.roam_smart.dto.ItinerarySaveRequestDTO;
import com.jsp.roam_smart.model.Itinerary;
import com.jsp.roam_smart.service.custom_itinerary.CustomItinerayService;
import com.jsp.roam_smart.service.search_place.PlaceAround;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/place-search")
@CrossOrigin(origins = "*")
public class PlaceSearchController {


    @Autowired
    private PlaceAround placeAPlaceAround;

    @Autowired
    private CustomItinerayService customItinerayService;
    
    @GetMapping("/explore")
    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> explorePlaces(@RequestParam String place) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("message", "List of places are displayed here");
        map.put("place", place);
        map.put("Places around :",placeAPlaceAround.getPlaceAround(place)); ;
        return ResponseEntity.status(200).body(map);
    }
    // @GetMapping("/custom-itinerary")
    // @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    // public ResponseEntity<Map<String, Object>> generateItinerary(@RequestParam String place,@RequestParam Long budget,@RequestParam int days) {
    //     Map<String,Object> map=new LinkedHashMap<>();
    //     map.put("message", "Custom itinerary for the city");
    //     map.put("custom itinerary",customItinerayService.getCustomItineray(place, budget, days) );
    //     return ResponseEntity.status(200).body(map);
    // }
    @PostMapping("/itinerary/generate")
    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> generateItinerary(@RequestBody ItineraryRequestDTO request) {
    Map<String, Object> map = new LinkedHashMap<>();
        
    String itinerary = customItinerayService.getCustomItineray(
        request.getMainPlace(),
        request.getBudget(),
        request.getDays(),
        request.getSelectedPlaces()
    );
    map.put("message", "Custom itinerary generated successfully.");
    map.put("mainPlace", request.getMainPlace());
    map.put("budget", request.getBudget());
    map.put("days", request.getDays());
    map.put("selectedPlaces", request.getSelectedPlaces());
    map.put("itinerary", itinerary);
    return ResponseEntity.status(200).body(map);
    }
    @PostMapping("/itinerary/save")
    public ResponseEntity<Map<String, Object>> postMethodName(@RequestBody ItinerarySaveRequestDTO request) {
        Map<String,Object> map=new LinkedHashMap<>();
        map.put("message", "Added record successfully");
        map.put("record", customItinerayService.saveItinerary(request));
        return ResponseEntity.status(201).body(map);
    }
    
   @GetMapping("/itinerary/saved")
    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getSavedItineraries(Principal principal) {
        String email = principal.getName();

        List<Itinerary> itineraries = customItinerayService.getSavedItineraries(email);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Fetched saved itineraries.");
        response.put("data", itineraries);

        return ResponseEntity.ok(response);
    }
    
}
