import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminRoute from '../../components/Routes/AdminRoute';
// context
import { useMainContext } from '../../context/User';
import { useRouter } from 'next/router';

function AdminPage() {
  const { authState, currentUser } = useMainContext();

  const router = useRouter();

  return (
    <AdminRoute>
      <div>
        <h1>{authState.name}</h1>
        <br></br>
        <Link href="/admin/ordini">Ordini</Link>
        <br></br>
        <Link href="/admin/clienti">Clienti</Link>
      </div>
    </AdminRoute>
  );
}

export default AdminPage;
