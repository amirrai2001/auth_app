'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { BASEURL } from '@/conflg/services/apiUrl';

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastRef = useRef<null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${BASEURL}users/team`, {
          withCredentials: true,
        });
        setTeam(res.data.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);



  return (
    <div className="p-4">
      <Toast ref={toastRef} />
      <h2 className="text-2xl font-semibold mb-4">My Team</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ProgressSpinner />
        </div>
      ) : (
        <DataTable value={team} paginator rows={10} className="p-datatable-sm">
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="role" header="Role" />
        </DataTable>
      )}
    </div>
  );
};

export default TeamList;
