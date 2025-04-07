'use client';

import { useState, useRef } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BASEURL } from '@/conflg/services/apiUrl';

const UploadProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const toast = useRef<Toast>(null);

  const handleImageSelect = (e: FileUploadSelectEvent) => {
    const file = e.files?.[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await axios.post(`${BASEURL}upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = res.data.imageUrl;
      }

      const payload = {
        name,
        description,
        price,
        image: imageUrl,
      };

      await axios.post(`${BASEURL}products`, payload, { withCredentials: true });

      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Product uploaded',
        life: 3000,
      });

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.current?.show({
        severity: 'error',
        summary: 'Upload Failed',
        detail: 'Please try again',
        life: 3000,
      });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Toast ref={toast} />
      <h2 className="text-2xl font-semibold mb-4">Upload Product</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <InputText id="name" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="price">Price</label>
          <InputText id="price" className="w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="md:col-span-2 mb-3">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" className="w-full" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="md:col-span-2 mb-3">
          <label>Image</label>
          <FileUpload
            mode="basic"
            name="image"
            accept="image/*"
            customUpload
            auto
            chooseLabel="Select Image"
            onSelect={handleImageSelect}
          />
        </div>
      </div>
      <div className='col-12 text-right'>
      <Button label="Upload Product" className=" mt-4" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default UploadProduct;
