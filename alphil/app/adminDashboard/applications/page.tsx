"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { FiDownload } from 'react-icons/fi';

type Application = {
  id: number;
  full_name: string;
  title: string;
  date_of_birth: string;
  nationality: string;
  id_number: string;
  county: string;
  sub_county: string;
  phone_number: string;
  po_box: string;
  postal_code: string;
  town: string;
  email: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  next_next_of_kin: string;
  next_next_of_kin_phone: string;
  course_name: string;
  mode_of_study: string;
  intake: string;
  financier: string;
  religion: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const statusColors: Record<string, string> = {
  Pending: 'bg-[#FFD700]',
  Approved: 'bg-[#013220]',
  Rejected: 'bg-[#FF338B]',
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [status, setStatus] = useState('');

  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('authToken') || '';
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const handleUnauthorized = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    try {
      const response = await fetchAPI(url, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        handleUnauthorized();
      }
      throw error;
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetchWithAuth('/admin/applications');
      if (response.success && Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        console.error('Invalid response format:', response);
        setApplications([]);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleDownload = async (id: number) => {
    try {
      const response = await fetchWithAuth(`/applications/${id}/download-docx`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Alphil College Application - ${id}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download application');
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setStatus(app.status);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await fetchWithAuth(`/admin/applications/${id}`, {
        method: 'DELETE',
      });
      await fetchApplications();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSave = async () => {
    if (!editingApp) return;
    try {
      await fetchWithAuth(`/admin/applications/${editingApp.id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      setEditingApp(null);
      await fetchApplications();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => setEditingApp(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 border-b border-[#A9A9A9]/20 pb-4">
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <div className="text-sm text-[#013220]/80">
          Total: {applications.length}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#013220] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center text-[#013220]/80 bg-[#013220]/5 rounded-lg py-10 border border-[#A9A9A9]/20">
          <p className="text-lg">No applications found.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded-lg shadow-sm border border-[#A9A9A9]/20 hover:border-[#013220]/50 transition-colors">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg text-[#013220]">{app.full_name}</h2>
                <span className={`px-2 py-1 text-xs rounded-full text-white ${statusColors[app.status] || 'bg-[#A9A9A9]'}`}>
                  {app.status}
                </span>
              </div>
              <div className="text-sm mt-3 space-y-1 text-[#013220]/80">
                <p><strong className="text-[#013220]">Email:</strong> {app.email}</p>
                <p><strong className="text-[#013220]">Phone:</strong> {app.phone_number}</p>
                <p><strong className="text-[#013220]">Course:</strong> {app.course_name}</p>
                <p><strong className="text-[#013220]">ID Number:</strong> {app.id_number}</p>
                <p><strong className="text-[#013220]">County:</strong> {app.county}</p>
                <p><strong className="text-[#013220]">Date:</strong> {new Date(app.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-end mt-4 gap-2 border-t border-[#A9A9A9]/20 pt-3">
                <button
                  onClick={() => handleDownload(app.id)}
                  className="text-sm bg-[#013220]/10 text-[#013220] px-3 py-1 rounded hover:bg-[#013220]/20 border border-[#013220]/20 flex items-center gap-1"
                >
                  <FiDownload size={14} /> Download
                </button>
                <button
                  onClick={() => handleEdit(app)}
                  className="text-sm bg-[#013220]/10 text-[#013220] px-3 py-1 rounded hover:bg-[#013220]/20 border border-[#013220]/20"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="text-sm bg-[#FF338B]/10 text-[#FF338B] px-3 py-1 rounded hover:bg-[#FF338B]/20 border border-[#FF338B]/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingApp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm border border-[#A9A9A9]/30">
            <div className="flex justify-between items-center mb-4 border-b border-[#A9A9A9]/20 pb-3">
              <h2 className="text-lg font-bold text-[#013220]">Update Status</h2>
              <button onClick={handleCancel} className="text-[#A9A9A9] hover:text-[#013220]">
                ✕
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-[#A9A9A9]/50 rounded px-3 py-2 bg-white text-[#013220] focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex justify-end mt-6 gap-3 border-t border-[#A9A9A9]/20 pt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-[#A9A9A9]/50 rounded text-[#013220] hover:bg-[#013220]/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#013220] text-white rounded hover:bg-[#013220]/90 border border-[#013220]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
