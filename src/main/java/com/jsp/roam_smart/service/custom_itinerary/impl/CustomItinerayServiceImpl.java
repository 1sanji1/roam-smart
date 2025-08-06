package com.jsp.roam_smart.service.custom_itinerary.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jsp.roam_smart.dto.ItinerarySaveRequestDTO;
import com.jsp.roam_smart.model.Itinerary;
import com.jsp.roam_smart.model.User;
import com.jsp.roam_smart.repository.ItineraryRepository;
import com.jsp.roam_smart.repository.UserRepository;
import com.jsp.roam_smart.service.custom_itinerary.CustomItinerayService;
import org.springframework.http.HttpMethod;

@Service
public class CustomItinerayServiceImpl implements CustomItinerayService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItineraryRepository itineraryRepository;

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Override
    public String getCustomItineray(String place, Long budget, int days, List<String> selectedPlaces) {
        if (place == null || place.trim().isEmpty() || budget == null || budget <= 0 || days <= 0) {
            throw new IllegalArgumentException("Invalid input for itinerary generation");
        }

        if (selectedPlaces != null && !selectedPlaces.isEmpty()) {
            System.out.println("Selected places: " + String.join(", ", selectedPlaces));
        }

        String url = "https://openrouter.ai/api/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("User-Agent", "https://roamsmart.ai");
        headers.set("X-Title", "RoamSmart Itinerary Generator");

        String selectedPlacesPrompt = "";
        if (selectedPlaces != null && !selectedPlaces.isEmpty()) {
            selectedPlacesPrompt = "Include these specific places in the plan if possible: "
                    + String.join(", ", selectedPlaces) + ". ";
        }

        String prompt = """
                Plan a %d-day trip to %s under ₹%d.
                %s
                Format the output clearly in plain text, like:

                day1:
                - travel
                - stay
                - places to visit (with entry fee)
                - breakfast, lunch, dinner (with cost)

                day2:
                ...

                day3:
                ...

                Then give:
                Total Estimated Cost: ₹xxxx

                Do not return JSON, markdown, or any code block. Just plain text. Keep it clear and readable also mention total cost at the last. also dont mention things like "Sure, I can help you plan a 3-day trip to Bangalore within your budget of ₹10,000. Here's a possible itinerary:" start from day 1 etc. also add a section at the end as "disclamer:" at the end "Please note that the prices mentioned above are estimates and may vary. It's recommended to check the prices beforehand.".
                """.formatted(days, place, budget, selectedPlacesPrompt);

        String requestBody = """
                {
                  "model": "mistralai/mixtral-8x7b-instruct",
                  "messages": [
                    {
                      "role": "user",
                      "content": "%s"
                    }
                  ]
                }
                """.formatted(prompt.replace("\"", "\\\""));

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map<String, Object> body = response.getBody();
            if (body == null || !body.containsKey("choices")) {
                System.err.println(" No choices received from OpenRouter.");
                return "No response received.";
            }

            List<Map<String, Object>> choices = (List<Map<String, Object>>) body.get("choices");
            if (choices.isEmpty()) {
                System.err.println(" Empty choices list.");
                return "No content received.";
            }

            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");

        } catch (Exception e) {
            e.printStackTrace();
            return " Failed to generate itinerary: " + e.getMessage();
        }
    }
    
    @Override
    public ItinerarySaveRequestDTO saveItinerary(ItinerarySaveRequestDTO request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Itinerary itinerary = Itinerary.builder().user(user).mainPlace(request.getMainPlace()).budget(request.getBudget()).days(request.getDays()).itinerary(request.getItinerary()).selectedPlaces(request.getSelectedPlaces()).build();
        itineraryRepository.save(itinerary);
        return request;
    }

     @Override
public List<Itinerary> getSavedItineraries(String email) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    return itineraryRepository.findByUser(user);
}
}
    