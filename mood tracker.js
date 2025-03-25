// Select elements
const moodButtons = document.querySelectorAll(".mood");
const currentMood = document.getElementById("current-mood");
const body = document.body;
const moodHistoryList = document.getElementById("mood-history");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const clearHistoryBtn = document.getElementById("clear-history");

// Mood colors mapping
const moodColors = {
    excited: "#FF4500",
    cheerful: "#FFD700",
    grateful: "#FFA500",
    confident: "#32CD32",
    proud: "#8B4513",
    playful: "#FF69B4",
    energetic: "#FF1493",
    sad: "#6495ED",
    heartbroken: "#DC143C",
    lonely: "#4682B4",
    guilty: "#696969",
    disappointed: "#708090",
    frustrated: "#FF8C00",
    annoyed: "#808000",
    angry: "#FF0000",
    jealous: "#008000",
    irritated: "#A52A2A",
    scared: "#800080",
    nervous: "#2E8B57",
    shocked: "#9932CC",
    confused: "#FF4500",
    loving: "#FF69B4",
    flirty: "#FF1493",
    caring: "#FFB6C1",
    admiring: "#FF6347",
    relaxed: "#90EE90",
    content: "#4682B4",
    bored: "#A9A9A9",
    indifferent: "#708090"
};

// Load previous moods from local storage
document.addEventListener("DOMContentLoaded", () => {
    loadMoodHistory();
    checkDarkMode();
});

// Mood button click event
moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        const mood = button.getAttribute("data-mood");
        const now = new Date();
        const date = now.toLocaleDateString("en-US"); // Get current date
        const time = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }); // Get current time
        
        // Change background color dynamically
        body.style.backgroundColor = moodColors[mood];

        // Update current mood text with animation
        currentMood.textContent = `${mood.charAt(0).toUpperCase() + mood.slice(1)} (${date}, ${time})`;
        currentMood.style.color = moodColors[mood];

        // Save mood with date and time to history
        saveMoodToHistory(mood, date, time);
    });
});

// Function to save mood history
function saveMoodToHistory(mood, date, time) {
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    
    // Always add new mood as a separate entry
    moodHistory.push({ date, mood, time });
    
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    loadMoodHistory();
}

// Function to load mood history
function loadMoodHistory() {
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moodHistoryList.innerHTML = "";
    
    moodHistory.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${entry.date}</strong>: ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)} (${entry.time})`;
        li.style.backgroundColor = moodColors[entry.mood];
        li.style.color = "white";
        li.style.padding = "10px";
        li.style.borderRadius = "5px";
        li.style.margin = "5px 0";
        moodHistoryList.appendChild(li);
    });
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    let isDark = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
});

// Check Dark Mode Setting
function checkDarkMode() {
    let isDark = JSON.parse(localStorage.getItem("darkMode"));
    if (isDark) body.classList.add("dark-mode");
}

// Clear History Button
clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("moodHistory");
    moodHistoryList.innerHTML = ""; // Clear the UI list
});
