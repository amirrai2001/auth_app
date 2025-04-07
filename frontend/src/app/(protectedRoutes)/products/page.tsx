'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/UserContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { Toast } from 'primereact/toast';
import { BASEURL, BASEURLPORT } from '@/conflg/services/apiUrl';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  createdBy: {
    name: string;
  };
}

const ProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASEURL}products`, {
          withCredentials: true,
        });
        setProducts(res.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await axios.post(
        `${BASEURL}orders`,
        {
          customerName: user?.name || 'Customer',
          products: [
            {
              productId,
              quantity: 1,
            },
          ],
        },
        { withCredentials: true }
      );

      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Item added to cart!',
        life: 3000,
      });
    } catch (error: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail:
          error?.response?.data?.message ||
          'Failed to add item to cart',
        life: 3000,
      });
    }
  };

  const handleEditClick = ()=>{
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail:
        'Sorry !! this feature is Still under Development',
      life: 3000,
    });
  }

  const imageTemplate = (rowData: Product) => {
    return rowData.image ? (
      <img
        src={`${BASEURLPORT}${rowData.image}`}
        alt={rowData.name}
        width={50}
        height={50}
        className="rounded shadow-sm"
        style={{ objectFit: 'cover' }}
      />
    ) : (
      <span className="text-gray-400 italic">No Image</span>
    );
  };

  const actionTemplate = (rowData: Product) => {
    return (
      <div className="flex gap-2">
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Link href={`#`}>
            <Button
              label="Edit"
              icon="pi pi-pencil"
              className="p-button-sm p-button-info"
              onClick={handleEditClick}
            />
          </Link>
        )}
        {user?.role === 'employee' && (
          <Button
            label="Add to Cart"
            icon="pi pi-shopping-cart"
            className="p-button-sm p-button-success"
            onClick={() => handleAddToCart(rowData._id)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <Toast ref={toast} />
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <DataTable
        value={products}
        loading={loading}
        paginator
        rows={10}
        responsiveLayout="scroll"
        className="shadow-md rounded-md"
      >
        <Column header="Image" body={imageTemplate} />
        <Column field="name" header="Name" sortable />
        <Column field="description" header="Description" sortable />
        <Column
          field="price"
          header="Price"
          body={(rowData) => `$${rowData.price.toFixed(2)}`}
        />
        <Column field="createdBy.name" header="Created By" />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default ProductsPage;
