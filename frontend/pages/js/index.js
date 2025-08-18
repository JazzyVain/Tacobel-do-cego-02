const crunchwrap_price = document.getElementById("crunchwrap-price");

async function fetchData() {
  try {
    const response = await fetch("http://172.17.9.54:3000/api/crunchwrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // ok vazio
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status} - ${body}`);
    }

    const data = await response.json();
    crunchwrap_price.textContent = data.mensagem;
  } catch (err) {
    console.error("Falha no fetch:", err);
    crunchwrap_price.textContent = "Erro ao carregar o conteúdo.";
  }
}
fetchData();
