export async function ambilCuaca(kota) {
  const apikey = "8901600020ddcf4b9393075d565becda";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apikey}&units=metric&lang=id`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Kota tidak ditemukan");
  }

  const data = await res.json();

  return data;
}

export async function ambilKutipan() {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error("Gagal mengambil data");
  }

  const data = await response.json();

  return data;
}