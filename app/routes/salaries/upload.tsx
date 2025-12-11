import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Chưa chọn file");

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:8888/upload/excel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(res.data);
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        className="border"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
