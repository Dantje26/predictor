// Teams data (simplified example)
const teams = ["Manchester United", "Liverpool", "Real Madrid", "Barcelona", "Juventus", "Inter Milan"];

const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");

// Populate team dropdowns
teams.forEach(team => {
    const optionA = document.createElement("option");
    optionA.value = team;
    optionA.textContent = team;
    teamASelect.appendChild(optionA);

    const optionB = document.createElement("option");
    optionB.value = team;
    optionB.textContent = team;
    teamBSelect.appendChild(optionB);
});

// Function to fetch last 3-5 matches (mock)
function fetchRecentMatches(team) {
    // Placeholder: replace with actual API fetch
    return [
        { opponent: "Team X", goalsFor: Math.floor(Math.random() * 4), goalsAgainst: Math.floor(Math.random() * 4) },
        { opponent: "Team Y", goalsFor: Math.floor(Math.random() * 4), goalsAgainst: Math.floor(Math.random() * 4) },
        { opponent: "Team Z", goalsFor: Math.floor(Math.random() * 4), goalsAgainst: Math.floor(Math.random() * 4) },
    ];
}

function predict() {
    const teamA = teamASelect.value;
    const teamB = teamBSelect.value;

    // Fetch matches
    const teamAMatches = fetchRecentMatches(teamA);
    const teamBMatches = fetchRecentMatches(teamB);

    // Display matches
    const teamAList = document.getElementById("teamA-matches");
    const teamBList = document.getElementById("teamB-matches");
    teamAList.innerHTML = "";
    teamBList.innerHTML = "";

    teamAMatches.forEach(match => {
        const li = document.createElement("li");
        li.textContent = `${match.opponent}: ${match.goalsFor} - ${match.goalsAgainst}`;
        teamAList.appendChild(li);
    });
    teamBMatches.forEach(match => {
        const li = document.createElement("li");
        li.textContent = `${match.opponent}: ${match.goalsFor} - ${match.goalsAgainst}`;
        teamBList.appendChild(li);
    });

    // Calculate expected goals
    const avgA = teamAMatches.reduce((sum, m) => sum + m.goalsFor, 0) / teamAMatches.length;
    const avgB = teamBMatches.reduce((sum, m) => sum + m.goalsFor, 0) / teamBMatches.length;
    const totalExpected = avgA + avgB;

    const overProb = totalExpected > 2.5 ? Math.min((totalExpected / 5) * 100, 95).toFixed(1) : (100 - Math.min((2.5 - totalExpected)/2.5*100, 95)).toFixed(1);
    const underProb = (100 - overProb).toFixed(1);
    const suggestion = overProb > underProb ? "Over 2.5" : "Under 2.5";

    // Display prediction
    document.getElementById("expected-goals").textContent = `Expected Goals: ${avgA.toFixed(2)} (Team A), ${avgB.toFixed(2)} (Team B)`;
    document.getElementById("total-goals").textContent = `Total Expected Goals: ${totalExpected.toFixed(2)}`;
    document.getElementById("over-under").textContent = `Probability Over 2.5: ${overProb}%, Under 2.5: ${underProb}%`;
    document.getElementById("suggestion").textContent = `Suggested Outcome: ${suggestion}`;
}
