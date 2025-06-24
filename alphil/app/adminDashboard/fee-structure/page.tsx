"use client";
import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

type Document = {
  id: number;
  name: string;
  url: string;
  size: number;
  mime_type: string;
  created_at: string;
};

export default function DocumentsAdminPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Fetch documents
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchAPI('/documents');
        setDocuments(data);
      } catch (error) {
        console.error('Failed to load documents:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const newDocument = await fetchAPI('/documents', {
        method: 'POST',
        body: formData,
      });

      setDocuments(prev => [newDocument, ...prev]);
      setShowUploadForm(false);
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await fetchAPI(`/documents/${id}`, { method: 'DELETE' });
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#013220] mb-4 md:mb-0">Manage Documents</h1>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 bg-[#013220] text-white px-6 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors"
        >
          {showUploadForm ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Upload New
            </>
          )}
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#A9A9A9]/20">
          <h2 className="text-2xl font-bold text-[#013220] mb-6">Upload Document</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#013220] mb-2">Document *</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#013220]/10 file:text-[#013220] hover:file:bg-[#013220]/20"
                required
              />
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 border border-[#A9A9A9]/50 rounded-lg text-[#013220] hover:bg-[#013220]/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-[#013220]/5 rounded-xl py-16 text-center border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No documents available</p>
          {!showUploadForm && (
            <button
              onClick={() => setShowUploadForm(true)}
              className="mt-6 bg-[#013220] text-white px-6 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors"
            >
              Upload Your First Document
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#A9A9A9]/20">
          <table className="min-w-full divide-y divide-[#A9A9A9]/20">
            <thead className="bg-[#013220]/5">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#013220] uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#013220] uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#013220] uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#013220] uppercase tracking-wider">
                  Uploaded
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#013220] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#A9A9A9]/20">
              {documents.map((document) => (
                <tr key={document.id} className="hover:bg-[#013220]/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={document.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#013220] hover:text-[#013220]/80 font-medium"
                    >
                      {document.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#013220]">
                    {document.mime_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#013220]">
                    {formatFileSize(document.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#013220]">
                    {new Date(document.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(document.id)}
                      className="text-[#FF338B] hover:text-[#FF338B]/80 font-medium flex items-center gap-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}