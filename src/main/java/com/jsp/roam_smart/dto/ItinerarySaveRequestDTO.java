package com.jsp.roam_smart.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItinerarySaveRequestDTO {
    private String mainPlace;
    private int budget;
    private int days;
    private List<String> selectedPlaces;
    private String itinerary;
}
