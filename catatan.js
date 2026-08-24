import { simpanData, muatData } from "./storage.js";

let catatanList = [];

export function buatCatatan(catatan) {
  //section catatan
  const judulCatatan = document.createElement("h2");
  judulCatatan.textContent = "Catatan Cepat";
  catatan.appendChild(judulCatatan);

  const inputCatatan = document.createElement("textarea");
  inputCatatan.placeholder = "Tulis catatan...";

  const tombolCatatan = document.createElement("button");
  tombolCatatan.type = "button";
  tombolCatatan.textContent = "Tambah Catatan";

  catatan.appendChild(inputCatatan);
  catatan.appendChild(tombolCatatan);

  const daftarCatatan = document.createElement("div");
  daftarCatatan.className = "daftar-catatan";
  catatan.appendChild(daftarCatatan);

  function simpanCatatan() {
    simpanData("catatanList", catatanList);
  }

  function muatCatatan() {
    const dataTersimpan = muatData("catatanList");

    if (dataTersimpan) {
      catatanList = dataTersimpan;
    }

    renderCatatan();
  }

  function renderCatatan() {
    daftarCatatan.innerHTML = "";

    catatanList.forEach(function (isiCatatan, index) {
      const kartu = document.createElement("div");
      kartu.className = "kartu-catatan";

      const teks = document.createElement("p");
      teks.textContent = isiCatatan;

      //edit catatan dengan klik dua kali
      teks.addEventListener("dblclick", function () {
        const catatanBaru = prompt(
          "Edit catatan:",
          isiCatatan
        );

        if (catatanBaru === null) {
          return;
        }

        if (catatanBaru.trim() === "") {
          alert("Catatan tidak boleh kosong!");
          return;
        }

        catatanList[index] = catatanBaru.trim();

        simpanCatatan();
        renderCatatan();
      });

      const tombolHapusCatatan =
        document.createElement("button");

      tombolHapusCatatan.type = "button";
      tombolHapusCatatan.textContent = "Hapus";

      tombolHapusCatatan.addEventListener(
        "click",
        function () {
          catatanList.splice(index, 1);

          simpanCatatan();
          renderCatatan();
        }
      );

      kartu.appendChild(teks);
      kartu.appendChild(tombolHapusCatatan);

      daftarCatatan.appendChild(kartu);
    });
  }

  tombolCatatan.addEventListener("click", function () {
    const isiCatatan = inputCatatan.value.trim();

    if (isiCatatan === "") {
      alert("Catatan tidak boleh kosong!");
      return;
    }

    catatanList.push(isiCatatan);

    inputCatatan.value = "";

    simpanCatatan();
    renderCatatan();
  });

  muatCatatan();
}