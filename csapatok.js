const csapatoBody = document.getElementById("csapatoBody");
const maincsapatok = document.querySelector(".maincsapatok");

let csapatoRefsOk = false;
let csapatok = JSON.parse(localStorage.getItem("csapatok")) || [];

function init() {
    if (csapatoBody && maincsapatok) {
        csapatoRefsOk = true;
        displayCsapatok();
    } else {
        console.error("Invalid references");
    }
}

init();

function createCsapat() {

    if (!csapatoRefsOk) {
        console.error("A csapat elemek nem találhatók.");
        return;
    }

    if (document.getElementById("csapatForm")) {
        return;
    }

    const formContainer = document.createElement("div");
    formContainer.id = "csapatForm";
    formContainer.classList.add("csapat-form");

    formContainer.innerHTML = `
    <div class="csapat-form-header">
        <span class="csapat-form-kicker">CSBUDDY TEAM</span>

        <h2 id="csapatFormTitle">
            Új csapat létrehozása
        </h2>

        <p id="csapatFormSubtitle">
            Állítsd be a csapat adatait és add hozzá a tagokat.
        </p>
    </div>

    <div class="csapat-form-fields">

        <div class="form-field">
            <label
                class="form-label"
                for="csapatName"
            >
                Csapat neve
            </label>

            <input
                type="text"
                id="csapatName"
                class="csapat-input"
                placeholder="Pl. Thunder Wolves"
                autocomplete="off"
                required
            >
        </div>


        <div class="form-field">
            <label
                class="form-label"
                for="csapatDescription"
            >
                Leírás
                <span class="optional-label">(opcionális)</span>
            </label>

            <textarea
                id="csapatDescription"
                class="csapat-textarea"
                placeholder="Írj néhány szót a csapatról..."
            ></textarea>
        </div>


        <div class="form-field">
            <label
                class="form-label"
                for="memberCount"
            >
                Tagok száma
            </label>

            <input
                type="number"
                id="memberCount"
                class="csapat-input"
                min="1"
                max="20"
                value="5"
                required
            >
        </div>


        <div
            id="memberInputs"
            class="member-inputs"
        ></div>

    </div>


    <div class="form-buttons">

        <button
            type="button"
            id="generateMembersBtn"
            class="csapat-secondary-btn"
        >
            Tagmezők létrehozása
        </button>

        <button
            type="button"
            id="submitCsapatBtn"
            class="csapat-primary-btn"
        >
            <span class="button-icon">+</span>
            Csapat létrehozása
        </button>

        <button
            type="button"
            id="cancelCsapatBtn"
            class="csapat-cancel-btn"
        >
            Mégse
        </button>

    </div>
`;
    maincsapatok.replaceWith(formContainer);



    document
        .getElementById("generateMembersBtn")
        .addEventListener("click", generateMemberInputs);



    document
        .getElementById("submitCsapatBtn")
        .addEventListener("click", saveCsapat);



    document
        .getElementById("cancelCsapatBtn")
        .addEventListener("click", cancelCsapat);
}



function generateMemberInputs() {

    const memberCount = Number(
        document.getElementById("memberCount").value
    );

    const memberInputs = document.getElementById("memberInputs");

    if (!memberCount || memberCount < 1 || memberCount > 20) {
        alert("A tagok száma 1 és 20 között lehet.");
        return;
    }

    memberInputs.innerHTML = `
        <h3>Csapattag</h3>
    `;

    for (let i = 1; i <= memberCount; i++) {

        const wrapper = document.createElement("div");
        wrapper.classList.add("member-input");

        wrapper.innerHTML = `
    <label
        class="form-label member-label"
        for="member${i}"
    >
        <span class="member-number">
            ${String(i).padStart(2, "0")}
        </span>

        ${i}. tag neve
    </label>

    <input
        type="text"
        id="member${i}"
        class="csapat-input member-name"
        placeholder="Tag ${i}"
        required
    >
`;

        memberInputs.appendChild(wrapper);
    }
}


function saveCsapat() {

    const csapatName = document
        .getElementById("csapatName")
        .value
        .trim();

    const description = document
        .getElementById("csapatDescription")
        .value
        .trim();

    const memberCount = Number(
        document.getElementById("memberCount").value
    );

    if (!csapatName) {
        alert("Adj meg egy csapat nevet!");
        return;
    }

    if (!memberCount || memberCount < 1) {
        alert("Legalább 1 tag szükséges!");
        return;
    }


    const memberNames = [];

    for (let i = 1; i <= memberCount; i++) {

        const input = document.getElementById(`member${i}`);

        if (!input) {
            alert("Először hozd létre a tagmezőket!");
            return;
        }

        const memberName = input.value.trim();

        if (!memberName) {
            alert(`Add meg a(z) ${i}. tag nevét!`);
            return;
        }

        memberNames.push(memberName);
    }



    const csapat = {
        id: Date.now(),
        name: csapatName,
        description: description,
        memberCount: memberCount,
        members: memberNames,
        createdAt: new Date().toISOString()
    };

    csapatok.push(csapat);
    localStorage.setItem("csapatok", JSON.stringify(csapatok));

    console.log("Létrehozott csapat:", csapat);

    displayCsapat(csapat);


    /*
    API DATABASEBE MAJD ITT MENJÜK EL
     */
}



function displayCsapat(csapat) {

    const form = document.getElementById("csapatForm");

    const csapatElement = document.createElement("div");
    csapatElement.classList.add("csapat");

    csapatElement.innerHTML = `
        <h2>${escapeHtml(csapat.name)}</h2>

        ${csapat.description
            ? `<p>${escapeHtml(csapat.description)}</p>`
            : ""
        }

        <p>
            <strong>Tagok:</strong>
            ${csapat.memberCount}
        </p>

        <h3>Csapattag</h3>

        <ul>
            ${csapat.members
            .map(member => `<li>${escapeHtml(member)}</li>`)
            .join("")}
        </ul>

        <button class="csapat-delete-btn" onclick="deleteCsapat(${csapat.id})">
            Törlés
        </button>
    `;

    form.replaceWith(csapatElement);
}



function displayCsapatok() {

    if (csapatok.length === 0) {
        return;
    }

    const csapatoListContainer = document.createElement("div");
    csapatoListContainer.classList.add("csapatok-list");

    csapatok.forEach(csapat => {
        const csapatElement = document.createElement("div");
        csapatElement.classList.add("csapat");

        csapatElement.innerHTML = `
            <h2>${escapeHtml(csapat.name)}</h2>

            ${csapat.description
                ? `<p>${escapeHtml(csapat.description)}</p>`
                : ""
            }

            <p>
                <strong>Tagok:</strong>
                ${csapat.memberCount}
            </p>

            <h3>Csapattag</h3>

            <ul>
                ${csapat.members
                .map(member => `<li>${escapeHtml(member)}</li>`)
                .join("")}
            </ul>

            <button class="csapat-delete-btn" onclick="deleteCsapat(${csapat.id})">
                Törlés
            </button>
        `;

        csapatoListContainer.appendChild(csapatElement);
    });

    maincsapatok.replaceWith(csapatoListContainer);
}



function deleteCsapat(id) {
    csapatok = csapatok.filter(c => c.id !== id);
    localStorage.setItem("csapatok", JSON.stringify(csapatok));
    location.reload();
}


function cancelCsapat() {

    const form = document.getElementById("csapatForm");

    if (!form) {
        return;
    }

    const newMain = document.createElement("div");

    newMain.classList.add("maincsapatok");

    newMain.innerHTML = `
        <button id="csapatBtn" onclick="createCsapat()">
            Csapat létrehozása
        </button>
    `;

    form.replaceWith(newMain);
}



function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
