const BASE_URL = "https://notes-api.dicoding.dev/v2";

const showLoading = () => {
  const loader = document.querySelector(".loading-overlay");
  if (loader) loader.style.display = "flex";
};

const hideLoading = () => {
  const loader = document.querySelector(".loading-overlay");
  if (loader) loader.style.display = "none";
};

export async function getNotes() {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Gagal mengambil catatan:", error);
    alert("Terjadi kesalahan saat memuat data.");
  } finally {
    hideLoading();
  }
}

export async function getArchivedNotes() {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Gagal mengambil arsip:", error);
  } finally {
    hideLoading();
  }
}

export async function addNote(title, body) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    return await response.json();
  } catch (error) {
    alert("Gagal menambah catatan. Cek koneksi internet Anda.");
  } finally {
    hideLoading();
  }
}

export async function deleteNote(id) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    alert("Gagal menghapus catatan.");
  } finally {
    hideLoading();
  }
}

export async function archiveNote(id) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    alert("Gagal mengarsipkan catatan.");
  } finally {
    hideLoading();
  }
}

export async function unarchiveNote(id) {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    alert("Gagal membatalkan arsip.");
  } finally {
    hideLoading();
  }
}
