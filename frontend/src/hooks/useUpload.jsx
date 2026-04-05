import { useState } from "react";

const URL = import.meta.env.VITE_BASE_SERVER_URL;

const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append('cover', fileToUpload);

    setLoading(true);
    setError(null);

    try {

      const token = localStorage.getItem('token');

      const response = await fetch(`${URL}/blogPosts/cover`, {
        method: 'POST',
        body: fileData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error during file upload");

      const data = await response.json();
      return data.img;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
};

export default useUpload;