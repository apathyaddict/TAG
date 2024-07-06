import React, { useState } from "react";
import { RiImageAddFill, RiDeleteBinFill } from "react-icons/ri";

const UploadImage = () => {
  const [images, setImages] = useState([]);
  const maxImages = 2;

  const handleImageUpload = (e) => {
    if (images.length < maxImages) {
      const file = e.target.files[0];
      if (file) {
        const newImage = URL.createObjectURL(file);
        setImages([...images, newImage]);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (images.length < maxImages) {
      const file = e.dataTransfer.files[0];
      if (file) {
        const newImage = URL.createObjectURL(file);
        setImages([...images, newImage]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
            className="w-1/2 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <div className="flex items-center justify-center font-semibold rounded-lg border-dashed border-2 border-gray-300 cursor-pointer  pointer-events-auto  hover:bg-blue-100 bg-gray-50 p-8 text-gray-500 text-center">
              <RiImageAddFill className="h-6 w-6 text-gray-500" />
              <span className="ml-2">
                Glissez et déposez des images ici ou cliquez pour télécharger
              </span>
            </div>
          </label>
        </>
      )}
    </div>
  );
};

export default UploadImage;
