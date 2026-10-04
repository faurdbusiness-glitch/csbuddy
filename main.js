const indexContent = document.querySelectorAll(".indexContent");
const patchNotes = document.getElementById("patchNotes");
const news = document.getElementById("news");
const upcomingTournaments = document.getElementById("upcomingTournaments");
let mainrefsOk = false;


function init() {
    if (indexContent && patchNotes && news && upcomingTournaments) {
        mainrefsOk = true;
    }
    else { console.error("Invalid references") }
};

init();

if (mainrefsOk) {
    loadPatchNotes();
}


function loadPatchNotes() {
    if (!mainrefsOk) {
        
        console.error("A fő elemek nem találhatók.");
        return;
    }
}