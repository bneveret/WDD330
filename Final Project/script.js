const baseURL = 'https://www.dnd5eapi.co/api/monsters/';
const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");

// Navigate to the saved monsters page when the "My List" button is clicked
document.getElementById('myListButton').addEventListener('click', function() {
  window.location.href = 'saved-monsters.html';  // Navigate to the saved monsters page
});

let allMonsters = [];  // This will store the list of all monsters

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

// Fetch and display all monsters when the page loads
async function loadAllMonsters() {
  try {
    const response = await fetch(`${baseURL}`);
    const data = await convertToJson(response);

    allMonsters = data.results;  // Store the fetched monsters

    displayMonsters(allMonsters);  // Display the monsters on the page
  } catch (error) {
    monsterResult.innerHTML = "Error: " + error.message;
  }
}

// Display a list of monsters
function displayMonsters(monsters) {
  if (document.body.classList.contains('viewing-details')) {
  document.body.classList.remove('viewing-details');
  }
  const monsterList = monsters.map(monster => `
    <div class="monster-item" data-index="${monster.index}">
      <h2>${monster.name}</h2>
      <button onclick="showMonsterDetails('${monster.index}')">View Details</button>
    </div>
  `).join('');
  
  monsterResult.innerHTML = `<ul>${monsterList}</ul>`;
}

// Search monsters based on input
async function searchMonsters(monsterName) {
  monsterResult.innerHTML = "Searching...";

  const matchingMonsters = allMonsters.filter((monster) =>
    monster.name.toLowerCase().includes(monsterName)
  );

  if (matchingMonsters.length > 0) {
    displayMonsters(matchingMonsters);
  } else {
    monsterResult.innerHTML = "No monsters found matching that name.";
  }
}

// Load all monsters when the page loads
loadAllMonsters();

// Search event listener
searchButton.addEventListener("click", () => {
  const monsterName = monsterInput.value.toLowerCase();
  if (monsterName) {
    searchMonsters(monsterName);
  } else {
    monsterResult.innerHTML = "Please enter a monster name.";
  }
});

// Show detailed information of a monster
async function showMonsterDetails(monsterIndex) {
  const monster = allMonsters.find(m => m.index === monsterIndex);
  
  if (monster) {
    const monsterDetails = await fetch(`${baseURL}${monsterIndex}`);
    const monsterData = await convertToJson(monsterDetails);

    displayMonsterDetails(monsterData);
  }
}

// Display detailed information of a single monster
function displayMonsterDetails(monster) {
  document.body.classList.add('viewing-details');
  const container = document.getElementById('monsterResult');
  const saveButton = `<button id="saveMonsterButton">Save Monster</button>`;
  
  // Add a Back to List button
  container.innerHTML = `
    <button onclick="displayMonsters(allMonsters)">Back to List</button>
    <div class="monster-header">
      <img src="${getMonsterImageUrl(monster.image)}" alt="${monster.name}" onError="this.onerror=null; this.src='path_to_placeholder_image.jpg';">
      <h2>${monster.name}</h2>
    </div>
    <ul>
      <li class="stat-item"><span>Size:</span><span class="value">${monster.size}</span></li>
      <li class="stat-item"><span>Type:</span><span class="value">${monster.type}</span></li>
      <li class="stat-item"><span>Alignment:</span><span class="value">${monster.alignment}</span></li>
      <li class="stat-item"><span>Armor Class:</span><span class="value">${monster.armor_class[0].value}</span></li>
      <li class="stat-item"><span>Hit Points:</span><span class="value">${monster.hit_points} (${monster.hit_dice})</span></li>
      <li class="stat-item"><span>Speed:</span><span class="value">${monster.speed.walk}, ${monster.speed.fly}, ${monster.speed.swim}</span></li>
      <li class="stat-item"><span>Challenge Rating:</span><span class="value">${monster.challenge_rating}</span></li>
      <li class="stat-item"><span>Languages:</span><span class="value">${monster.languages}</span></li>
    </ul>
    
    <div class="special-abilities">
      <h3>Special Abilities</h3>
      <ul>
        ${monster.special_abilities.map(ability => `
          <li class="ability-item">
            <strong>${ability.name}</strong>: ${ability.desc}
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="actions">
      <h3>Actions</h3>
      <ul>
        ${monster.actions.map(action => `
          <li class="action-item">
            <strong>${action.name}</strong>: ${action.desc}
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="legendary-actions">
      <h3>Legendary Actions</h3>
      <ul>
        ${monster.legendary_actions.map(action => `
          <li class="action-item">
            <strong>${action.name}</strong>: ${action.desc}
          </li>
        `).join('')}
      </ul>
    </div>

    ${saveButton}
  `;

  // Attach event listener to Save button
  const saveMonsterButton = document.getElementById('saveMonsterButton');
  saveMonsterButton.addEventListener('click', () => saveMonsterToList(monster));
}

// Function to save monster to local storage
function saveMonsterToList(monster) {
  let savedMonsters = JSON.parse(localStorage.getItem('savedMonsters')) || [];
  
  // Check if the monster is already saved
  if (savedMonsters.some(saved => saved.index === monster.index)) {
    alert('This monster is already in your saved list!');
  } else {
    savedMonsters.push(monster);  // Add the monster to the list
    localStorage.setItem('savedMonsters', JSON.stringify(savedMonsters));
    alert('Monster saved to your list!');
  }
}

function getMonsterImageUrl(imagePath) {
  const baseImageUrl = 'https://www.dnd5eapi.co';
  
  // If the image path is not fully qualified, prepend the base URL
  return imagePath && !imagePath.startsWith('http') ? baseImageUrl + imagePath : imagePath;
}
