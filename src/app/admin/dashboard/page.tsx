'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {

  LogOut,
  Inbox,
  Clock,
  CheckCircle2,
  FileText,
  XCircle,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Phone,
  Mail,
  Building2,
  Package,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Inquiry {
  _id: string;
  name: string;
  company: string;
  gst: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  notes?: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusConfig = {
  new: {
    label: 'New',
    icon: Inbox,
    color: 'bg-blue-100 text-blue-700',
  },
  contacted: {
    label: 'Contacted',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700',
  },
  quoted: {
    label: 'Quoted',
    icon: FileText,
    color: 'bg-purple-100 text-purple-700',
  },
  closed: {
    label: 'Closed',
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-700',
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-token');
    }
    return null;
  };

  const fetchInquiries = useCallback(
    async (page = 1) => {
      const token = getToken();
      if (!token) {
        router.push('/admin/login');
        return;
      }

      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: '20',
          ...(statusFilter !== 'all' && { status: statusFilter }),
        });

        const res = await fetch(`/api/admin/inquiries?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem('admin-token');
          router.push('/admin/login');
          return;
        }

        const data = await res.json();
        setInquiries(data.inquiries || []);
        setPagination(data.pagination || pagination);
      } catch {
        toast.error('Failed to fetch inquiries.');
      } finally {
        setLoading(false);
      }
    },
    [statusFilter, router]
  );

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const updateStatus = async (id: string, status: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        toast.success('Status updated!');
        fetchInquiries(pagination.page);
      } else {
        toast.error('Failed to update status.');
      }
    } catch {
      toast.error('Network error.');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success('Inquiry deleted.');
        setSelectedInquiry(null);
        fetchInquiries(pagination.page);
      } else {
        toast.error('Failed to delete.');
      }
    } catch {
      toast.error('Network error.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/admin/login');
  };

  const statusCounts = {
    all: pagination.total,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    quoted: inquiries.filter((i) => i.status === 'quoted').length,
    closed: inquiries.filter((i) => i.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Dhanya Trader's Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500">Dhanya Trader&apos;s</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchInquiries(pagination.page)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCcw className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'new', 'contacted', 'quoted', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600 border hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All Inquiries' : status}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="card p-12 text-center">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  No inquiries found
                </h3>
                <p className="text-sm text-gray-500">
                  {statusFilter !== 'all'
                    ? `No ${statusFilter} inquiries. Try a different filter.`
                    : 'No inquiries yet. They will appear here.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inquiry) => {
                  const config = statusConfig[inquiry.status] || statusConfig.new;
                  const StatusIcon = config.icon;

                  return (
                    <button
                      key={inquiry._id}
                      onClick={() => setSelectedInquiry(inquiry)}
                      className={`card p-4 w-full text-left hover:shadow-md transition-shadow ${
                        selectedInquiry?._id === inquiry._id
                          ? 'ring-2 ring-primary-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {inquiry.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {config.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            <Package className="w-3.5 h-3.5 inline mr-1" />
                            {inquiry.product}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(inquiry.createdAt).toLocaleDateString(
                              'en-IN',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  Page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchInquiries(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => fetchInquiries(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedInquiry ? (
              <div className="card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Inquiry Details</h3>
                  <button
                    onClick={() => deleteInquiry(selectedInquiry._id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Name</span>
                    <p className="text-gray-900">{selectedInquiry.name}</p>
                  </div>
                  {selectedInquiry.company && (
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-500">Company</span>
                        <p className="text-gray-900">{selectedInquiry.company}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-500">Email</span>
                      <p>
                        <a
                          href={`mailto:${selectedInquiry.email}`}
                          className="text-primary-500 hover:underline"
                        >
                          {selectedInquiry.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-500">Phone</span>
                      <p>
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="text-primary-500 hover:underline"
                        >
                          {selectedInquiry.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                  {selectedInquiry.gst && (
                    <div>
                      <span className="font-medium text-gray-500">GST</span>
                      <p className="text-gray-900">{selectedInquiry.gst}</p>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-500">Product</span>
                      <p className="text-gray-900 font-medium">
                        {selectedInquiry.product}
                      </p>
                    </div>
                  </div>
                  {selectedInquiry.quantity && (
                    <div>
                      <span className="font-medium text-gray-500">Quantity</span>
                      <p className="text-gray-900">{selectedInquiry.quantity}</p>
                    </div>
                  )}
                  {selectedInquiry.message && (
                    <div>
                      <span className="font-medium text-gray-500">Message</span>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>
                  )}

                  {/* Status Update */}
                  <div className="pt-4 border-t">
                    <span className="font-medium text-gray-500 block mb-2">
                      Update Status
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(statusConfig).map(([key, config]) => {
                        const StatusIcon = config.icon;
                        return (
                          <button
                            key={key}
                            onClick={() =>
                              updateStatus(selectedInquiry._id, key)
                            }
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              selectedInquiry.status === key
                                ? config.color + ' ring-2 ring-offset-1'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            {config.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center sticky top-24">
                <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  Select an inquiry to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
