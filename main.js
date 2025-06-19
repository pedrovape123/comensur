const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGG3tOPvFu_u3yK5_RwB5irLaMkU3jEluyPAK4eXBJq8wpdFlDwdqPVdaKeU8ipToi/exec";
const form = document.getElementById("registroForm");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  if (!form.checkValidity()) {
    status.textContent = "Revisa los campos marcados.";
    status.className = "error";
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();
    status.textContent = json.message || "Inscripción registrada ✔️";
    status.className = "success";
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = "Ups… No se pudo guardar. Vuelve a intentarlo más tarde.";
    status.className = "error";
  }
});
