// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gear page functionality
    initGearPage();
});

function initGearPage() {
    const gearForm = document.getElementById('gear-form');
    const checklistContainer = document.getElementById('checklist-container');
    const savedListsContainer = document.getElementById('saved-lists-container');
    
    // Gear database - organized by category
    const gearDatabase = {
        essentials: [
            "Navigation (map, compass, GPS)",
            "Headlamp/Flashlight (extra batteries)",
            "Sun Protection (sunglasses, sunscreen, hat)",
            "First Aid Kit",
            "Knife/Multi-tool",
            "Fire Starter (matches, lighter)",
            "Emergency Shelter (tent, space blanket, bivy)",
            "Extra Food",
            "Extra Water",
            "Extra Clothes"
        ],
        clothing: {
            spring: [
                "Moisture-wicking base layers",
                "Insulating mid-layer (fleece)",
                "Waterproof/windproof shell",
                "Hiking pants (convertible recommended)",
                "Wool or synthetic socks",
                "Sturdy hiking boots",
                "Rain jacket and pants",
                "Warm hat and gloves"
            ],
            summer: [
                "Lightweight, breathable shirt",
                "Hiking shorts or pants",
                "Sun hat or cap",
                "Sunglasses",
                "Lightweight hiking shoes or trail runners",
                "Moisture-wicking socks",
                "Light rain jacket (for unexpected showers)"
            ],
            fall: [
                "Moisture-wicking base layers",
                "Insulating layers (fleece, down jacket)",
                "Waterproof/windproof shell",
                "Hiking pants",
                "Wool or synthetic socks",
                "Sturdy hiking boots",
                "Warm hat and gloves",
                "Neck gaiter or buff"
            ],
            winter: [
                "Thermal base layers",
                "Insulating mid-layers (fleece, down)",
                "Waterproof/windproof shell",
                "Insulated pants or snow pants",
                "Wool or synthetic socks (consider liners)",
                "Insulated waterproof boots",
                "Warm hat, balaclava, or face mask",
                "Insulated gloves or mittens",
                "Gaiters"
            ]
        },
        footwear: [
            "Hiking boots or shoes appropriate for terrain",
            "Camp shoes or sandals (for overnight)",
            "Extra pair of socks"
        ],
        hydration: [
            "Water bottles or hydration reservoir",
            "Water filter or purification tablets",
            "Electrolyte replacement"
        ],
        nutrition: [
            "High-energy snacks (trail mix, bars, gels)",
            "Lunch/sandwiches",
            "Electrolyte drinks or tablets"
        ],
        safety: [
            "Whistle",
            "Personal locator beacon or satellite messenger",
            "Emergency contact information",
            "Itinerary left with someone"
        ],
        personal: [
            "Prescription medications",
            "Personal hygiene items",
            "Hand sanitizer",
            "Toilet paper and trowel (for backcountry)"
        ],
        electronics: [
            "Fully charged phone",
            "Portable power bank",
            "Camera",
            "Headlamp with extra batteries"
        ],
        overnight: [
            "Backpacking tent",
            "Sleeping bag appropriate for temperatures",
            "Sleeping pad",
            "Cooking system (stove, fuel, pot)",
            "Food for duration of trip",
            "Bear canister or food hang system",
            "Camp towel"
        ]
    };
    
    // Add event listener to gear form
    if (gearForm) {
        gearForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateChecklist();
        });
    }
    
    // Function to generate checklist based on form inputs
    function generateChecklist() {
        const hikeType = document.getElementById('hike-type').value;
        const season = document.getElementById('season').value;
        const difficulty = document.getElementById('difficulty').value;
        const weather = document.getElementById('weather').value;
        
        // Validate form
        if (!hikeType || !season || !difficulty || !weather) {
            alert('Please fill out all form fields.');
            return;
        }
        
        // Create checklist object
        const checklist = {
            hikeType,
            season,
            difficulty,
            weather,
            timestamp: new Date().toISOString(),
            items: {}
        };
        
        // Always include essentials
        checklist.items.essentials = gearDatabase.essentials;
        
        // Add clothing based on season
        if (gearDatabase.clothing[season]) {
            checklist.items.clothing = gearDatabase.clothing[season];
        }
        
        // Add footwear
        checklist.items.footwear = gearDatabase.footwear;
        
        // Add hydration
        checklist.items.hydration = gearDatabase.hydration;
        
        // Add nutrition
        checklist.items.nutrition = gearDatabase.nutrition;
        
        // Add safety items
        checklist.items.safety = gearDatabase.safety;
        
        // Add personal items
        checklist.items.personal = gearDatabase.personal;
        
        // Add electronics
        checklist.items.electronics = gearDatabase.electronics;
        
        // Add overnight gear if needed
        if (hikeType === 'overnight' || hikeType === 'multi-day') {
            checklist.items.overnight = gearDatabase.overnight;
            
            // Add more food for multi-day trips
            if (hikeType === 'multi-day') {
                checklist.items.nutrition.push("Extra meals for additional days");
            }
        }
        
        // Add weather-specific items
        if (weather === 'rainy') {
            if (!checklist.items.clothing) checklist.items.clothing = [];
            checklist.items.clothing.push("Waterproof pack cover");
            checklist.items.clothing.push("Quick-dry towel");
        } else if (weather === 'cold') {
            if (!checklist.items.clothing) checklist.items.clothing = [];
            checklist.items.clothing.push("Extra warm layers");
            checklist.items.clothing.push("Hand warmers");
        }
        
        // Add difficulty-specific items
        if (difficulty === 'difficult') {
            checklist.items.safety.push("Emergency communication device");
            checklist.items.safety.push("More comprehensive first aid kit");
        }
        
        // Display the checklist
        displayChecklist(checklist);
    }
    
    // Function to display checklist in the container
    function displayChecklist(checklist) {
        let html = '';
        
        // Loop through each category in the checklist
        for (const [category, items] of Object.entries(checklist.items)) {
            if (items && items.length > 0) {
                html += `
                    <div class="checklist-category">
                        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <div class="checklist-items">
                `;
                
                // Add each item in the category
                items.forEach(item => {
                    html += `
                        <div class="checklist-item">
                            <input type="checkbox" id="${category}-${item.replace(/\s+/g, '-').toLowerCase()}">
                            <label for="${category}-${item.replace(/\s+/g, '-').toLowerCase()}">${item}</label>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            }
        }
        
        // Update the checklist container
        checklistContainer.innerHTML = html;
        
        // Add event listeners to checkboxes for persistence
        addCheckboxListeners(checklist);
    }
    
    // Function to add event listeners to checkboxes
    function addCheckboxListeners(checklist) {
        const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            // Load saved state from localStorage
            const savedState = getSavedData(`checklist-${checkbox.id}`);
            if (savedState) {
                checkbox.checked = savedState;
                
                if (savedState) {
                    checkbox.closest('.checklist-item').classList.add('checked');
                }
            }
            
            // Add change event listener
            checkbox.addEventListener('change', function() {
                const item = this.closest('.checklist-item');
                
                if (this.checked) {
                    item.classList.add('checked');
                } else {
                    item.classList.remove('checked');
                }
                
                // Save state to localStorage
                saveData(`checklist-${this.id}`, this.checked);
            });
        });
    }
    
    // Save checklist functionality
    const saveChecklistBtn = document.getElementById('save-checklist');
    if (saveChecklistBtn) {
        saveChecklistBtn.addEventListener('click', function() {
            const hikeType = document.getElementById('hike-type').value;
            const season = document.getElementById('season').value;
            
            if (!hikeType || !season) {
                alert('Please generate a checklist first.');
                return;
            }
            
            // Get current checklist state
            const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
            const checklistState = {};
            
            checkboxes.forEach(checkbox => {
                checklistState[checkbox.id] = checkbox.checked;
            });
            
            // Create saved checklist object
            const savedChecklist = {
                id: Date.now().toString(),
                name: `${season.charAt(0).toUpperCase() + season.slice(1)} ${hikeType} Hike`,
                date: new Date().toLocaleDateString(),
                hikeType,
                season,
                difficulty: document.getElementById('difficulty').value,
                weather: document.getElementById('weather').value,
                state: checklistState
            };
            
            // Save to localStorage
            const savedChecklists = getSavedData('savedChecklists') || [];
            savedChecklists.push(savedChecklist);
            
            if (saveData('savedChecklists', savedChecklists)) {
                alert('Checklist saved successfully!');
                displaySavedChecklists();
            } else {
                alert('Error saving checklist. Please try again.');
            }
        });
    }
    
    // Clear checklist functionality
    const clearChecklistBtn = document.getElementById('clear-checklist');
    if (clearChecklistBtn) {
        clearChecklistBtn.addEventListener('click', function() {
            const checkboxes = checklistContainer.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest('.checklist-item').classList.remove('checked');
                
                // Clear from localStorage
                localStorage.removeItem(`checklist-${checkbox.id}`);
            });
        });
    }
    
    // Print checklist functionality
    const printChecklistBtn = document.getElementById('print-checklist');
    if (printChecklistBtn) {
        printChecklistBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Function to display saved checklists
    function displaySavedChecklists() {
        const savedChecklists = getSavedData('savedChecklists') || [];
        
        if (savedChecklists.length === 0) {
            savedListsContainer.innerHTML = '<p class="placeholder">No saved checklists yet. Generate and save a checklist to see it here.</p>';
            return;
        }
        
        let html = '';
        
        savedChecklists.forEach(checklist => {
            html += `
                <div class="saved-checklist">
                    <div class="saved-checklist-header">
                        <div>
                            <div class="saved-checklist-title">${checklist.name}</div>
                            <div class="saved-checklist-meta">Saved: ${checklist.date} | Difficulty: ${checklist.difficulty} | Weather: ${checklist.weather}</div>
                        </div>
                        <div class="saved-checklist-actions">
                            <button class="btn-secondary load-checklist" data-id="${checklist.id}">Load</button>
                            <button class="btn-secondary delete-checklist" data-id="${checklist.id}">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        savedListsContainer.innerHTML = html;
        
        // Add event listeners to load and delete buttons
        document.querySelectorAll('.load-checklist').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                loadChecklist(id);
            });
        });
        
        document.querySelectorAll('.delete-checklist').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteChecklist(id);
            });
        });
    }
    
    // Function to load a saved checklist
    function loadChecklist(id) {
        const savedChecklists = getSavedData('savedChecklists') || [];
        const checklist = savedChecklists.find(c => c.id === id);
        
        if (!checklist) {
            alert('Checklist not found.');
            return;
        }
        
        // Set form values
        document.getElementById('hike-type').value = checklist.hikeType;
        document.getElementById('season').value = checklist.season;
        document.getElementById('difficulty').value = checklist.difficulty;
        document.getElementById('weather').value = checklist.weather;
        
        // Generate the checklist
        generateChecklist();
        
        // After a short delay, restore the saved state
        setTimeout(() => {
            for (const [itemId, checked] of Object.entries(checklist.state)) {
                const checkbox = document.getElementById(itemId);
                if (checkbox) {
                    checkbox.checked = checked;
                    
                    if (checked) {
                        checkbox.closest('.checklist-item').classList.add('checked');
                    }
                    
                    // Save to localStorage
                    saveData(`checklist-${itemId}`, checked);
                }
            }
        }, 100);
    }
    
    // Function to delete a saved checklist
    function deleteChecklist(id) {
        if (confirm('Are you sure you want to delete this checklist?')) {
            const savedChecklists = getSavedData('savedChecklists') || [];
            const updatedChecklists = savedChecklists.filter(c => c.id !== id);
            
            if (saveData('savedChecklists', updatedChecklists)) {
                displaySavedChecklists();
            } else {
                alert('Error deleting checklist. Please try again.');
            }
        }
    }
    
    // Initialize the page by displaying saved checklists
    displaySavedChecklists();
}