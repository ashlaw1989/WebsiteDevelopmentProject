document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll(".modal");
    const closeBtn = document.getElementById("cancel");
    M.Modal.init(modals);

    

    closeBtn.addEventListener("click", () => {
        const modal = document.getElementById("modal-signup");
        M.Modal.getInstance(modal).close();
    });
})