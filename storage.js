export function simpanData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function muatData(key) {
  const dataTersimpan = localStorage.getItem(key);

  if (dataTersimpan) {
    return JSON.parse(dataTersimpan);
  }

  return null;
}