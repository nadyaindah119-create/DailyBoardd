import { simpanData, muatData } from "./storage.js";

let tugasList = [];
let filterAktif = "semua";
let kataPencarian = "";

export function buatTugas(tugas) {

  //kolom pencarian tugas
  const inputCari = document.createElement("input");

  inputCari.type = "text";
  inputCari.placeholder = "Cari tugas...";

  tugas.appendChild(inputCari);

  //membuat form minggu3 fase1
  const form = document.createElement("form");

  //membuat input nama tugas
  const inputTugas = document.createElement("input");
  inputTugas.type = "text";
  inputTugas.placeholder = "Nama tugas...";

  //membuat tombol Tambah
  const tombolTambah = document.createElement("button");
  tombolTambah.type = "button";
  tombolTambah.textContent = "Tambah";

  //menambahkan input dan tombol ke form
  form.appendChild(inputTugas);
  form.appendChild(tombolTambah);

  //menambahkan form ke section tugas
  tugas.appendChild(form);

  //membuat daftar tugas fase2 minggu4
  const daftarTugas = document.createElement("ul");
  tugas.appendChild(daftarTugas);

  //membuat tombol filter
  const tombolSemua = document.createElement("button");
  tombolSemua.textContent = "Semua";
  tombolSemua.type = "button";

  const tombolSelesaiFilter = document.createElement("button");
  tombolSelesaiFilter.textContent = "Selesai";
  tombolSelesaiFilter.type = "button";

  const tombolBelumSelesai = document.createElement("button");
  tombolBelumSelesai.textContent = "Belum Selesai";
  tombolBelumSelesai.type = "button";

  //menambahkan tombol filter ke section tugas
  tugas.appendChild(tombolSemua);
  tugas.appendChild(tombolSelesaiFilter);
  tugas.appendChild(tombolBelumSelesai);

  function simpanTugas() {
    simpanData("tugasList", tugasList);
  }

  function muatTugas() {
    const dataTersimpan = muatData("tugasList");

    if (dataTersimpan) {
      tugasList = dataTersimpan;
    }

    renderTugas();
  }

  //minggu5 fase2
  function tambahTugas() {
    const namaTugas = inputTugas.value.trim();

    if (namaTugas === "") {
      return;
    }

    tugasList.push({
      nama: namaTugas,
      selesai: false
    });

    inputTugas.value = "";

    simpanTugas();
    renderTugas();
  }

  function renderTugas() {
    daftarTugas.innerHTML = "";

    tugasList.forEach(function (tugasItem, index) {

      if (
        filterAktif === "selesai" &&
        tugasItem.selesai === false
      ) {
        return;
      }

      if (
        filterAktif === "belum selesai" &&
        tugasItem.selesai === true
      ) {
        return;
      }

      if (
        kataPencarian !== "" &&
        !tugasItem.nama
          .toLowerCase()
          .includes(kataPencarian.toLowerCase())
      ) {
        return;
      }

      const li = document.createElement("li");

      //pencarian tugas secara real-time
      inputCari.addEventListener("input", function () {
        kataPencarian = inputCari.value.trim();

        renderTugas();
      });

      //membuat tugas bisa di-drag
      li.setAttribute("draggable", true);

      li.dataset.index = index;

      li.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData(
          "text/plain",
          index
        );
      });

      li.addEventListener("dragover", function (event) {
        event.preventDefault();
      });

      li.addEventListener("drop", function (event) {
        event.preventDefault();

        const indexAwal = Number(
          event.dataTransfer.getData("text/plain")
        );

        const indexTujuan = index;

        if (indexAwal === indexTujuan) {
          return;
        }

        //ambil tugas yang dipindahkan
        const tugasDipindahkan =
          tugasList.splice(indexAwal, 1)[0];

        //masukkan ke posisi baru
        tugasList.splice(
          indexTujuan,
          0,
          tugasDipindahkan
        );

        simpanTugas();
        renderTugas();
      });

      const teksTugas =
        document.createElement("span");

      teksTugas.textContent = tugasItem.nama;

      if (tugasItem.selesai) {
        teksTugas.style.textDecoration =
          "line-through";

        teksTugas.style.opacity = "0.6";
      }

      li.appendChild(teksTugas);

      //edit tugas dengan klik dua kali
      li.addEventListener("dblclick", function () {
        const namaBaru = prompt(
          "Edit tugas:",
          tugasItem.nama
        );

        if (namaBaru === null) {
          return;
        }

        if (namaBaru.trim() === "") {
          alert("Tugas tidak boleh kosong!");
          return;
        }

        tugasItem.nama = namaBaru.trim();

        simpanTugas();
        renderTugas();
      });

      //tombol selesai minggu6 fase2
      const tombolSelesai =
        document.createElement("button");

      tombolSelesai.textContent =
        tugasItem.selesai
          ? "Belum Selesai"
          : "Selesai";

      tombolSelesai.type = "button";

      tombolSelesai.addEventListener(
        "click",
        function () {
          tugasItem.selesai =
            !tugasItem.selesai;

          simpanTugas();
          renderTugas();
        }
      );

      //tombol hapus
      const tombolHapus =
        document.createElement("button");

      tombolHapus.textContent = "Hapus";
      tombolHapus.type = "button";

      tombolHapus.addEventListener(
        "click",
        function () {
          tugasList.splice(index, 1);

          simpanTugas();
          renderTugas();
        }
      );

      li.appendChild(tombolSelesai);
      li.appendChild(tombolHapus);

      daftarTugas.appendChild(li);
    });
  }

  tombolSemua.addEventListener("click", function () {
    filterAktif = "semua";
    renderTugas();
  });

  tombolSelesaiFilter.addEventListener(
    "click",
    function () {
      filterAktif = "selesai";
      renderTugas();
    }
  );

  tombolBelumSelesai.addEventListener(
    "click",
    function () {
      filterAktif = "belum selesai";
      renderTugas();
    }
  );

  tombolTambah.addEventListener(
    "click",
    function () {
      tambahTugas();
    }
  );

  muatTugas();
}