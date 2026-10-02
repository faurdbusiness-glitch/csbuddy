const tornaBody = document.getElementById("tornaBody");
const maintorna = document.querySelector(".maintorna");

let tornaRefsOk = false;

function init() {
    if (tornaBody && maintorna) {
        tornaRefsOk = true;
    } else {
        console.error("Invalid references");
    }
}

init();


function createTorna() {

    if (!tornaRefsOk) {
        console.error("A torna elemek nem találhatók.");
        return;
    }

    if (document.getElementById("tornaForm")) {
        return;
    }

    const formContainer = document.createElement("div");
    formContainer.id = "tornaForm";
    formContainer.classList.add("torna-form");

    formContainer.innerHTML = `
    <div class="torna-form-header">
        <span class="torna-form-kicker">CSBUDDY TOURNAMENT</span>

        <h2 id="tornaFormTitle">
            Új torna létrehozása
        </h2>

        <p id="tornaFormSubtitle">
            Állítsd be a torna adatait és add hozzá az induló csapatokat.
        </p>
    </div>

    <div class="torna-form-fields">

        <div class="form-field">
            <label
                class="form-label"
                for="tornaName"
            >
                Torna neve
            </label>

            <input
                type="text"
                id="tornaName"
                class="torna-input"
                placeholder="Pl. CSBuddy Summer Cup"
                autocomplete="off"
                required
            >
        </div>


        <div class="form-field">
            <label
                class="form-label"
                for="tornaDescription"
            >
                Leírás
                <span class="optional-label">(opcionális)</span>
            </label>

            <textarea
                id="tornaDescription"
                class="torna-textarea"
                placeholder="Írj néhány szót a tornáról..."
            ></textarea>
        </div>


        <div class="form-row">

            <div class="form-field">
                <label
                    class="form-label"
                    for="bracketCount"
                >
                    Bracketek száma
                </label>

                <input
                    type="number"
                    id="bracketCount"
                    class="torna-input"
                    min="1"
                    max="64"
                    value="1"
                    required
                >
            </div>


            <div class="form-field">
                <label
                    class="form-label"
                    for="teamCount"
                >
                    Csapatok száma
                </label>

                <input
                    type="number"
                    id="teamCount"
                    class="torna-input"
                    min="2"
                    max="64"
                    value="8"
                    required
                >
            </div>

        </div>


        <div
            id="teamInputs"
            class="team-inputs"
        ></div>

    </div>


    <div class="form-buttons">

        <button
            type="button"
            id="generateTeamsBtn"
            class="torna-secondary-btn"
        >
            Csapatmezők létrehozása
        </button>

        <button
            type="button"
            id="submitTornaBtn"
            class="torna-primary-btn"
        >
            <span class="button-icon">+</span>
            Torna létrehozása
        </button>

        <button
            type="button"
            id="cancelTornaBtn"
            class="torna-cancel-btn"
        >
            Mégse
        </button>

    </div>
`;
    maintorna.replaceWith(formContainer);



    document
        .getElementById("generateTeamsBtn")
        .addEventListener("click", generateTeamInputs);



    document
        .getElementById("submitTornaBtn")
        .addEventListener("click", saveTorna);



    document
        .getElementById("cancelTornaBtn")
        .addEventListener("click", cancelTorna);
}



function generateTeamInputs() {

    const teamCount = Number(
        document.getElementById("teamCount").value
    );

    const teamInputs = document.getElementById("teamInputs");

    if (!teamCount || teamCount < 2 || teamCount > 64) {
        alert("A csapatok száma 2 és 64 között lehet.");
        return;
    }

    teamInputs.innerHTML = `
        <h3>Csapatok</h3>
    `;

    for (let i = 1; i <= teamCount; i++) {

        const wrapper = document.createElement("div");
        wrapper.classList.add("team-input");

        wrapper.innerHTML = `
    <label
        class="form-label team-label"
        for="team${i}"
    >
        <span class="team-number">
            ${String(i).padStart(2, "0")}
        </span>

        ${i}. csapat neve
    </label>

    <input
        type="text"
        id="team${i}"
        class="torna-input team-name"
        placeholder="Csapat ${i}"
        required
    >
`;

        teamInputs.appendChild(wrapper);
    }
}


function saveTorna() {

    const tornaName = document
        .getElementById("tornaName")
        .value
        .trim();

    const description = document
        .getElementById("tornaDescription")
        .value
        .trim();

    const bracketCount = Number(
        document.getElementById("bracketCount").value
    );

    const teamCount = Number(
        document.getElementById("teamCount").value
    );

    if (!tornaName) {
        alert("Adj meg egy torna nevet!");
        return;
    }

    if (!bracketCount || bracketCount < 1) {
        alert("A bracketek száma legalább 1 legyen!");
        return;
    }

    if (!teamCount || teamCount < 2) {
        alert("Legalább 2 csapat szükséges!");
        return;
    }


    const teamNames = [];

    for (let i = 1; i <= teamCount; i++) {

        const input = document.getElementById(`team${i}`);

        if (!input) {
            alert("Először hozd létre a csapatmezőket!");
            return;
        }

        const teamName = input.value.trim();

        if (!teamName) {
            alert(`Add meg a(z) ${i}. csapat nevét!`);
            return;
        }

        teamNames.push(teamName);
    }



    const torna = {
        id: Date.now(),
        name: tornaName,
        description: description,
        bracketCount: bracketCount,
        teamCount: teamCount,
        teams: teamNames,
        createdAt: new Date().toISOString()
    };


    console.log("Létrehozott torna:", torna);



    displayTorna(torna);


    /*
    API DATABASEBE MAJD ITT MENJÜK EL
     */
}



function displayTorna(torna) {

    const form = document.getElementById("tornaForm");

    const tornaElement = document.createElement("div");
    tornaElement.classList.add("torna");

    tornaElement.innerHTML = `
        <h2>${escapeHtml(torna.name)}</h2>

        ${torna.description
            ? `<p>${escapeHtml(torna.description)}</p>`
            : ""
        }

        <p>
            <strong>Bracketek:</strong>
            ${torna.bracketCount}
        </p>

        <p>
            <strong>Csapatok:</strong>
            ${torna.teamCount}
        </p>

        <h3>Induló csapatok</h3>

        <ul>
            ${torna.teams
            .map(team => `<li>${escapeHtml(team)}</li>`)
            .join("")}
        </ul>
    `;

    form.replaceWith(tornaElement);
}



function cancelTorna() {

    const form = document.getElementById("tornaForm");

    if (!form) {
        return;
    }

    const newMain = document.createElement("div");

    newMain.classList.add("maintorna");

    newMain.innerHTML = `
        <button id="tornaBtn" onclick="createTorna()">
            Torna létrehozása
        </button>
    `;

    form.replaceWith(newMain);
}



function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}