import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { MdSaveAlt } from "react-icons/md";
import { RiImageAddFill, RiDeleteBinFill } from "react-icons/ri";
import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { refFromURL } from "firebase/database";

const UploadImage = ({ imagesUrl }) => {
  const [images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (imagesUrl && imagesUrl.length > 0) {
      setImages(imagesUrl || []);
    }
  }, [imagesUrl]);

  const [imageFiles, setImageFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const maxImages = 2;

  const handleImageUpload = (e) => {
    if (images.length < maxImages) {
      const file = e.target.files[0];
      if (file) {
        const newImage = URL.createObjectURL(file);
        setImages([...images, newImage]);
        setImageFiles([...imageFiles, file]);
      }
    } else {
      toast.warn(`Vous ne pouvez télécharger que jusqu'à ${maxImages} photos.`);
    }
  };

  const handleDeleteImage = async (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageFiles(updatedImageFiles);

    try {
      // Get the URL of the image to be deleted from Firestore
      const ficheRef = doc(db, "fiches", id);
      const ficheSnap = await getDoc(ficheRef);
      const currentData = ficheSnap.exists() ? ficheSnap.data() : {};
      const imageUrlToDelete = currentData.imagesUrl[index];

      // Delete from Firestore
      const updatedUrls = currentData.imagesUrl.filter((_, i) => i !== index);
      await setDoc(ficheRef, { ...currentData, imagesUrl: updatedUrls });

      // Delete from Storage
      const imageRef = ref(storage, imageUrlToDelete);
      await deleteObject(imageRef);

      console.log("Image deleted successfully from storage and Firestore.");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (images.length < maxImages) {
      const file = e.dataTransfer.files[0];
      if (file) {
        const newImage = URL.createObjectURL(file);
        setImages([...images, newImage]);
        setImageFiles([...imageFiles, file]);
      }
    } else {
      toast.warn(`Vous ne pouvez télécharger que jusqu'à ${maxImages} photos.`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    console.log("2", id);
    setIsUploading(true);
    const uploadPromises = imageFiles.map(async (file) => {
      const imgRef = ref(storage, `files/${uuidv4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      await saveUrl(url, id);
      return url;
    });

    try {
      const urls = await Promise.all(uploadPromises);
      toast.success("Images sauvegarder avec succès!");
      console.log("Uploaded image URLs: ", urls);
      setIsUploading(false);
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde", error);
      console.error("Error uploading images: ", error);
      setIsUploading(false);
    }
  };

  const saveUrl = async (url, id) => {
    try {
      const ficheRef = doc(db, "fiches", id);
      const ficheSnap = await getDoc(ficheRef);
      const currentData = ficheSnap.exists() ? ficheSnap.data() : {};

      const updatedFiches = {
        ...currentData,
        imagesUrl: [...(currentData.imagesUrl || []), url],
        // imagesUrl: [url],
      };

      await setDoc(ficheRef, updatedFiches, { merge: true });

      console.log("URL saved successfully!");
    } catch (error) {
      console.error("Error saving URL: ", error);
      return;
    }
  };

  return (
    <div className="bg-white w-full mx-auto p-8 rounded-lg shadow-md flex flex-col gap-4 justify-start items-center">
      <div className="w-full px-4 text-slate-400">Photo:</div>
      <div className="w-full px-4 text-sm text-slate-500">
        Vous pouvez télécharger jusqu'à deux photos.
        <p>Formats acceptés : JPG, PNG.</p>
      </div>
      <div className="w-full flex gap-4 flex-wrap justify-center text-slate-800">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              className="rounded-md w-[400px] h-[400px] object-contain"
              alt="uploaded_photo"
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 shadow-md"
              onClick={() => handleDeleteImage(index)}>
              <RiDeleteBinFill className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {images.length < maxImages && (
        <>
          <input
            type="file"
            id="upload-button"
            accept="image/jpeg, image/png"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label
            htmlFor="upload-button"
            className="md:w-1/2 w-4/5 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <div className="flex md:items-center md:justify-center font-semibold rounded-lg border-dashed border-2 border-gray-300 cursor-pointer  pointer-events-auto  hover:bg-blue-100 bg-gray-50 p-8 text-gray-500 text-center">
              <RiImageAddFill className="md:h-6 md:w-6 h-10 w-12 text-gray-500" />
              <span className="ml-2">
                Glissez et déposez des images ici ou cliquez pour télécharger
              </span>
            </div>
          </label>
        </>
      )}

      <div className="flex justify-end w-full">
        <button
          className="uppercase flex items-center font-semibold rounded-lg border border-solid cursor-pointer text-white bg-blue-400 border-blue-500 hover:bg-blue-600 px-4 py-2 text-sm disabled:cursor-auto disabled:border-blue-100 disabled:bg-blue-200"
          disabled={
            isUploading || images.length > maxImages || images.length === 0
          }
          onClick={handleSave}>
          <MdSaveAlt className="h-6 w-6 pr-2 text-white" />
          {isUploading ? "Téléchargement..." : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
