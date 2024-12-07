const baseURL = 'https://www.dnd5eapi.co/api/monsters/';
const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

searchButton.addEventListener("click", () => {
  const monsterName = monsterInput.value.toLowerCase();
  if (monsterName) {
    searchMonster(monsterName);
  } else {
    monsterResult.innerHTML = "Please enter a monster name.";
  }
});

function searchMonster(monsterName) {
  monsterResult.innerHTML = "Searching...";

  const response = fetch(baseURL);
    const data = convertToJson(response);
    const results = data.Result.filter((searchResult) => {
      if(monsterName === "") {
        return searchResult;
      } else if (searchResult.Name.toLowerCase().includes(monsterName.toLowerCase())) {
        return searchResult;
      }
      return results;
      });
      const monsterData = results.data;
      results.innerHTML = `
        <h2>${monsterData.name}</h2>
        <p><strong>Index:</strong> ${monsterData.index}</p>
        <!-- You can display more monster details here -->
      `;
      
}