package com.jsp.roam_smart.service.search_place.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jsp.roam_smart.dto.LatLonDTO;
import com.jsp.roam_smart.dto.PlaceAroundDetailsDTO;
import com.jsp.roam_smart.service.search_place.PlaceAround;
import com.jsp.roam_smart.service.search_place.PlaceService;

@Service
public class PlaceAroundImpl implements PlaceAround {
    @Autowired 
    private RestTemplate restTemplate;

    @Value("${geoapipy.api.key}")
    private String key;

    @Autowired
    private PlaceService placeService;
    public List<PlaceAroundDetailsDTO> getPlaceAround(String place) {

        LatLonDTO latLonDTO = placeService.convertToCoordinates(place);
        double lat = Double.parseDouble(latLonDTO.getLat());
        double lon = Double.parseDouble(latLonDTO.getLon());
        
         //${GEOAPIFY_API};-Macha not woing for now hardcode key
        String url="https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:"+lon+","+lat+",50000&limit=20&apiKey="+key;

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> features = (List<Map<String, Object>>) response.get("features");


        List<PlaceAroundDetailsDTO> results = new ArrayList<>();


        if (features != null && !features.isEmpty()) {
            for (Map<String, Object> feature : features) {
                Map<String, Object> properties = (Map<String, Object>) feature.get("properties");

                PlaceAroundDetailsDTO dto = new PlaceAroundDetailsDTO();
                dto.setName((String) properties.get("name"));
                dto.setFormattedAddress((String) properties.get("formatted"));
                dto.setLat(((Number) properties.get("lat")).doubleValue());
                dto.setLon(((Number) properties.get("lon")).doubleValue());

                results.add(dto);
            }
        } else {
            System.out.println("No places found around the specified location.");
        }

        return results;
        

    }
}
