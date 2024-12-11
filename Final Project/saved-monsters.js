// Fetch and display saved monsters
function displaySavedMonsters() {
    const savedMonsters = JSON.parse(localStorage.getItem('savedMonsters')) || [];
    const savedMonstersResult = document.getElementById('savedMonstersResult');
    
    if (savedMonsters.length > 0) {
      savedMonstersResult.innerHTML = savedMonsters.map(monster => `
        <div class="monster-header">
      <img src="${getMonsterImageUrl(monster.image)}" alt="${monster.name}" onError="this.onerror=null; this.src='path_to_placeholder_image.jpg';">
      <h2>${monster.name}</h2>
      <button class="remove-from-list-button" onclick="removeMonsterFromList('${monster.index}' )">Remove from List</button>
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
  `);
    } else {
      savedMonstersResult.innerHTML = "<p>No monsters saved.</p>";
    }}


  function getMonsterImageUrl(imagePath) {
    const baseImageUrl = 'https://www.dnd5eapi.co';
    
    // If the image path is not fully qualified, prepend the base URL
    return imagePath && !imagePath.startsWith('http') ? baseImageUrl + imagePath : imagePath;
  }

  function removeMonsterFromList(monsterIndex) {
    let savedMonsters = JSON.parse(localStorage.getItem('savedMonsters')) || [];
    savedMonsters = savedMonsters.filter(monster => monster.index !== monsterIndex); // Remove the monster
    localStorage.setItem('savedMonsters', JSON.stringify(savedMonsters)); // Update local storage
    displaySavedMonsters(); // Refresh the saved monsters display
  }

  // Call the function when the page loads
  displaySavedMonsters();