'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { BASEURL } from '@/conflg/services/apiUrl';

interface Manager {
  _id: string;
  name: string;
}

const UpdateMember = () => {
  const { id } = useParams();
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [managerId, setManagerId] = useState('');
  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    const fetchUserAndManagers = async () => {
      try {
        const res = await axios.get(`${BASEURL}users/${id}`, {
          withCredentials: true,
        });
        const user = res.data.data;
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
          setManagerId(user.manager || '');
        }

        const managerRes = await axios.post(`${BASEURL}users/manager`, {}, {
          withCredentials: true,
        });
        const filteredManagers = managerRes.data.data.filter((m: any) => m.role === 'manager');
        setManagers(filteredManagers);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserAndManagers();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const payload: any = { name, email };
      if (password) payload.password = password;
      if (managerId && role === 'employee') payload.managerId = managerId;
      payload.role = role;

      await axios.put(`${BASEURL}users/${id}`, payload, {
        withCredentials: true,
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'User updated successfully',
        life: 3000,
      });

      setTimeout(() => {
        router.push('/member/list');
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Update failed',
        life: 3000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASEURL}users/${id}`, {
        withCredentials: true,
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Deleted',
        detail: 'User deleted successfully',
        life: 3000,
      });

      setTimeout(() => {
        router.push('/member/admin');
      }, 1500);
    } catch (err) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Delete failed',
        life: 3000,
      });
    }
  };

  const confirmDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: handleDelete,
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Toast ref={toast} />
      <ConfirmDialog />
      <h2 className="text-2xl font-semibold mb-4">Update Member</h2>
      <div className="formgrid grid ">
        <div className="field md:col-6">
          <label htmlFor="name">Name</label>
          <InputText id="name" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field md:col-6">
          <label htmlFor="email">Email</label>
          <InputText id="email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field md:col-6">
          <label htmlFor="password">Password (optional)</label>
          <Password id="password" className="w-full"  feedback={false}  value={password} onChange={(e) => setPassword(e.target.value)}  />
        </div>
        <div className="field md:col-6">
          <label htmlFor="role">Role</label>
          <Dropdown
            id="role"
            value={role}
            options={[
              { label: 'Manager', value: 'manager' },
              { label: 'Employee', value: 'employee' },
            ]}
            onChange={(e) => setRole(e.value)}
            placeholder="Select Role"
            className="w-full"
          />
        </div>
        {role === 'employee' && (
          <div className="field md:col-6">
            <label htmlFor="manager">Manager</label>
            <Dropdown
              id="manager"
              value={managerId}
              options={managers}
              optionLabel="name"
              optionValue="_id"
              onChange={(e) => setManagerId(e.value)}
              placeholder="Select Manager"
              className="w-full"
            />
          </div>
        )}
          <div className="col-12">
 <div className='flex justify-content-end'>
 <Button label="Update Member" icon="pi pi-check" className="p-button-success p-2 mx-1" onClick={handleUpdate} />
 <Button label="Delete" icon="pi pi-trash" className="p-button-danger p-2 mx-1" onClick={confirmDelete} />
 </div>
     
      </div>
      </div>
    
    </div>
  );
};

export default UpdateMember;
