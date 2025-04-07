'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { BASEURL } from '@/conflg/services/apiUrl';

interface Manager {
  _id: string;
  name: string;
}

const AddNewUser = () => {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    managerId: '',
  });

  const [managers, setManagers] = useState<Manager[]>([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.post(`${BASEURL}users/manager`, {}, {
          withCredentials: true,
        });
        setManagers(res.data.data);
      } catch (err) {
        console.error('Failed to fetch managers', err);
      }
    };

    fetchManagers();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role === 'employee') {
        payload.managerId = formData.managerId;
      }

      await axios.post(`${BASEURL}users/add`, payload, {
        withCredentials: true,
      });

      toast.current?.show({
        severity: 'success',
        summary: 'User Created',
        detail: 'User has been added successfully!',
        life: 3000,
      });

      setTimeout(() => router.push('/member/admin/'), 1500);
    } catch (err) {
      console.error(err);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create user',
        life: 3000,
      });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Toast ref={toast} />
      <h2 className="text-2xl font-semibold mb-4">Add New Member</h2>
      <div className="formgrid grid">
        <div className="field md:col-6">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            className="w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="field md:col-6">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            className="w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="field md:col-6">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            className="w-full"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            feedback={false}
          />
        </div>

        <div className="field md:col-6">
          <label htmlFor="role">Role</label>
          <Dropdown
            id="role"
            value={formData.role}
            options={[
              { label: 'Employee', value: 'employee' },
              { label: 'Manager', value: 'manager' },
            ]}
            onChange={(e) => setFormData({ ...formData, role: e.value })}
            placeholder="Select Role"
            className="w-full"
          />
        </div>

        {formData.role === 'employee' && (
          <div className="field md:col-6">
            <label htmlFor="manager">Assign to Manager</label>
            <Dropdown
              id="manager"
              value={formData.managerId}
              options={managers}
              optionLabel="name"
              optionValue="_id"
              onChange={(e) => setFormData({ ...formData, managerId: e.value })}
              placeholder="Select Manager"
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button label="Add Member" icon="pi pi-plus" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddNewUser;
