import { buatTugas } from "./tugas.js";
import { buatCatatan } from "./catatan.js";
import { ambilCuaca, ambilKutipan } from "./api.js";

const app = document.getElementById("app");

//tombol Dark Mode
const tombolDarkMode = document.createElement("button");
tombolDarkMode.id = "toggle-tema";
tombolDarkMode.textContent = "Dark Mode";

document.body.insertBefore(tombolDarkMode, app);

//mengaktifkan menonaktifkan dark mode
function aturDarkMode() {
  const modeGelap = localStorage.getItem("darkMode");

  if (modeGelap === "aktif") {
    document.body.classList.add("dark-mode");
    tombolDarkMode.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    tombolDarkMode.textContent = "Dark Mode";
  }
}

//saat tombol diklik
tombolDarkMode.addEventListener("click", function () {
  const sedangGelap =
    document.body.classList.contains("dark-mode");

  if (sedangGelap) {
    localStorage.setItem("darkMode", "nonaktif");
  } else {
    localStorage.setItem("darkMode", "aktif");
  }

  aturDarkMode();
});

aturDarkMode();

//minggu2 fase1
const tugas = document.createElement("section");
tugas.className = "tugas";

const catatan = document.createElement("section");
catatan.className = "catatan";

const cuaca = document.createElement("section");
cuaca.className = "cuaca";

app.appendChild(tugas);
app.appendChild(catatan);
app.appendChild(cuaca);

buatTugas(tugas);
buatCatatan(catatan);

//cuaca
const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";

//kutipan
const kutipan = document.createElement("section");
kutipan.className = "kutipan";

const judulKutipan = document.createElement("h2");
judulKutipan.textContent = "Kutipan Hari Ini";

const isiKutipan = document.createElement("p");
isiKutipan.textContent = "Memuat kutipan...";

const tombolRefresh = document.createElement("button");
tombolRefresh.textContent = "Refresh";
tombolRefresh.type = "button";

kutipan.appendChild(judulKutipan);
kutipan.appendChild(isiKutipan);
kutipan.appendChild(tombolRefresh);

cuaca.appendChild(kutipan);

const formCuaca = document.createElement("form");

const inputKota = document.createElement("input");
inputKota.type = "text";
inputKota.placeholder = "Nama kota";

const tombolCari = document.createElement("button");
tombolCari.type = "submit";
tombolCari.textContent = "Cari";

formCuaca.appendChild(inputKota);
formCuaca.appendChild(tombolCari);

cuaca.appendChild(formCuaca);
cuaca.appendChild(infoCuaca);

//event form cuaca
formCuaca.addEventListener(
  "submit",
  async function (event) {
    event.preventDefault();

    const kota = inputKota.value.trim();

    if (kota === "") {
      infoCuaca.textContent =
        "Nama kota tidak boleh kosong!";
      return;
    }

    infoCuaca.textContent = "Memuat cuaca...";

    try {
      const data = await ambilCuaca(kota);

      infoCuaca.innerHTML = `
        <p>${data.name}: ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
      `;
    } catch (error) {
      infoCuaca.textContent =
        "Kota tidak ditemukan";
    }
  }
);


async function tampilkanKutipan() {
  isiKutipan.textContent = "Memuat Kutipan";

  try {
    const data = await ambilKutipan();

    isiKutipan.textContent =
      `"${data.quote}" — ${data.author}`;
  } catch (error) {
    isiKutipan.textContent =
      "Gagal memuat kutipan";
  }
}

tombolRefresh.addEventListener("click", async function () {
  isiKutipan.textContent = "Memuat Kutipan";
  try {
    await tampilkanKutipan();
  } catch (error) {
    isiKutipan.textContent = "Gagal memuat kutipan";
  }
});
  
async function muatSemuaWidget() {
  try {
    const [dataKutipan, dataCuaca] = await Promise.all([
      ambilKutipan(),
      ambilCuaca("Jakarta")
    ]);

    isiKutipan.textContent =
      `"${dataKutipan.quote}" — ${dataKutipan.author}`;

    infoCuaca.innerHTML = `
      <p>${dataCuaca.name}: ${dataCuaca.main.temp}°C</p>
      <p>${dataCuaca.weather[0].description}</p>
    `;
  } catch (error) {
    isiKutipan.textContent =
      "Gagal memuat kutipan";

    infoCuaca.textContent =
      "Sebagian widget gagal dimuat.";
  }
}
muatSemuaWidget();