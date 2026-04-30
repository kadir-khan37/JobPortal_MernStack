const formData = new FormData();
formData.append("name", companyName);
formData.append("logo", file);

await instance.post("/api/v1/company/register", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});