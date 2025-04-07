'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/UserContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { BASEURL } from '@/conflg/services/apiUrl';

interface Order {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  products: {
    product: {
      name: string;
      description: string;
    };
    quantity: number;
    price: number;
  }[];
  createdBy: {
    name: string;
  };
}

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      let endpoint = '';
      if (user.role === 'admin') {
        endpoint = 'orders/all';
      } else if (user.role === 'manager') {
        endpoint = 'orders/team';
      } else if (user.role === 'employee') {
        endpoint = 'orders/my-orders';
      }

      try {
        const res = await axios.get(`${BASEURL}${endpoint}`, {
          withCredentials: true,
        });
        setOrders(res.data.data);
      } catch (error:any) {
        toast.current?.show({
          severity: 'error',
          summary: 'Error fetching orders',
          detail: error?.data?.message || 'Something went wrong',
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const statusTemplate = (rowData: Order) => {
    return <span className="font-medium">{rowData.status}</span>;
  };

  return (
    <div className="p-6">
      <Toast ref={toast} />
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <DataTable
        value={orders}
        loading={loading}
        paginator
        rows={10}
        responsiveLayout="scroll"
        className="shadow-md rounded-md"
      >
        <Column field="customerName" header="Customer" />
        <Column
          field="totalAmount"
          header="Total"
          body={(rowData) => `$${rowData.totalAmount.toFixed(2)}`}
        />
        <Column field="status" header="Status" body={statusTemplate} />
        <Column
          field="createdBy.name"
          header="Created By"
        />
        <Column
          header="Products"
          body={(rowData) => (
            <ul className="list-disc list-inside">
              {rowData.products.map((p:any, index:any) => (
                <li key={index}>
                  {p.product?.name} x {p.quantity} (${p.price})
                </li>
              ))}
            </ul>
          )}
        />
      </DataTable>
    </div>
  );
};

export default OrdersPage;
