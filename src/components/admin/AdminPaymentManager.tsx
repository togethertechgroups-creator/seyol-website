'use client';

import React, { useState, useMemo } from 'react';
import { 
  CreditCard, DollarSign, CheckCircle2, AlertCircle, 
  Search, Filter, Plus, ArrowUpRight, ArrowDownRight,
  Receipt, Download, Clock, User, Calendar, ExternalLink
} from 'lucide-react';
import { usePortalData } from '../../context/PortalDataContext';
import { useAdminData } from '../../context/AdminDataContext';
import { CareInvoice } from '../../types';

export const AdminPaymentManager: React.FC = () => {
  const { allClientData, updateInvoice, addInvoice } = usePortalData();
  const { orders, updateOrderStatus } = useAdminData();

  const [activeLedgerTab, setActiveLedgerTab] = useState<'invoices' | 'stripe'>('stripe');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Compile all client portal invoices
  const clientInvoices = useMemo(() => {
    const list: {
      type: 'care_package';
      clientId: string;
      clientName: string;
      invoice: CareInvoice;
    }[] = [];

    Object.values(allClientData).forEach((c) => {
      c.invoices.forEach((inv) => {
        list.push({
          type: 'care_package',
          clientId: c.clientId,
          clientName: c.clientName,
          invoice: inv,
        });
      });
    });

    return list;
  }, [allClientData]);

  // Financial Metrics
  const totalCarePaid = clientInvoices.reduce((acc, item) => acc + (item.invoice.status === 'paid' ? item.invoice.totalAmount : item.invoice.paidAmount), 0);
  const totalCarePending = clientInvoices.reduce((acc, item) => acc + (item.invoice.status !== 'paid' ? item.invoice.balanceDue : 0), 0);
  const totalStoreOrdersRevenue = orders.reduce((acc, o) => acc + (o.orderStatus !== 'cancelled' ? o.totalAmount : 0), 0);
  const grandTotalRevenue = totalCarePaid + totalStoreOrdersRevenue;

  // Live Gateway Transactions (Stripe Cards, UPI, QR, NetBanking)
  const stripeOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        o.paymentMethod === 'stripe' ||
        o.paymentMethod === 'card' ||
        o.paymentMethod === 'upi' ||
        o.paymentMethod === 'netbanking' ||
        Boolean(o.stripePaymentIntentId) ||
        (o.paymentStatus === 'paid' && o.orderType === 'service')
    );
  }, [orders]);
  const totalStripeRevenue = stripeOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  // Filtered List
  const filteredInvoices = useMemo(() => {
    return clientInvoices.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.clientName.toLowerCase().includes(q) ||
        item.invoice.packageTitle.toLowerCase().includes(q) ||
        item.invoice.invoiceNumber.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'paid' && item.invoice.status === 'paid') ||
        (statusFilter === 'pending' && item.invoice.status !== 'paid');

      return matchesSearch && matchesStatus;
    });
  }, [clientInvoices, searchQuery, statusFilter]);

  // Form State for Custom Invoice
  const [selectedClientId, setSelectedClientId] = useState(Object.keys(allClientData)[0] || '');
  const [newInvTitle, setNewInvTitle] = useState('');
  const [newInvAmount, setNewInvAmount] = useState('');
  const [newInvDue, setNewInvDue] = useState(new Date().toISOString().split('T')[0]);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId || !newInvTitle || !newInvAmount) return;

    const newInv: CareInvoice = {
      id: `inv-custom-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvDue,
      packageTitle: newInvTitle.trim(),
      totalAmount: Number(newInvAmount),
      paidAmount: 0,
      balanceDue: Number(newInvAmount),
      status: 'pending_milestone',
    };

    addInvoice(selectedClientId, newInv);
    setIsNewInvoiceOpen(false);
    setNewInvTitle('');
    setNewInvAmount('');
    showToast(`Invoice generated and added to ${allClientData[selectedClientId]?.clientName}'s portal!`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gold/40 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
            Finance &amp; Billing Control
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
            Payment Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track care package milestone installments, online product order transactions, and collection status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewInvoiceOpen(true)}
          className="px-5 py-2.5 bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-md cursor-pointer transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Issue Custom Invoice</span>
        </button>
      </div>

      {/* Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Revenue Collected</div>
          <div className="text-2xl font-serif font-black text-[#7B1131] mt-1">₹{grandTotalRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Care Packages + Store Orders</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Care Milestone Collected</div>
          <div className="text-2xl font-serif font-black text-neutral-800 mt-1">₹{totalCarePaid.toLocaleString()}</div>
          <div className="text-[11px] text-neutral-500 font-semibold mt-1">From Enrolled Mothers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Outstanding Client Balance</div>
          <div className="text-2xl font-serif font-black text-rose-700 mt-1">₹{totalCarePending.toLocaleString()}</div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">Due on future milestones</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Online Store Product Sales</div>
          <div className="text-2xl font-serif font-black text-amber-700 mt-1">₹{totalStoreOrdersRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-neutral-500 font-semibold mt-1">{orders.length} orders processed</div>
        </div>
      </div>

      {/* Payment Methods Breakdown */}
      <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-sm text-neutral-900">Payment Modes &amp; Channels</h3>
          <span className="text-[11px] text-neutral-400">Instant Settlements Supported</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="font-bold text-neutral-800">UPI / QR Code</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Google Pay, PhonePe, Paytm</div>
            <div className="font-bold text-emerald-700 mt-1">54% Share</div>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="font-bold text-neutral-800">Cards &amp; NetBanking</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Visa, Mastercard, RuPay</div>
            <div className="font-bold text-blue-700 mt-1">32% Share</div>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="font-bold text-neutral-800">In-Home / COD</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Cash collected by Matron</div>
            <div className="font-bold text-amber-700 mt-1">10% Share</div>
          </div>
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="font-bold text-neutral-800">Direct WhatsApp Pay</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Bank Wire / PayNow (SG)</div>
            <div className="font-bold text-purple-700 mt-1">4% Share</div>
          </div>
        </div>
      </div>

      {/* Invoices Ledger Table */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
        {/* Subheader & Tabs */}
        <div className="p-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setActiveLedgerTab('stripe')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeLedgerTab === 'stripe'
                    ? 'bg-[#7B1131] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span>💳 Stripe Live Ledger ({stripeOrders.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLedgerTab('invoices')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeLedgerTab === 'invoices'
                    ? 'bg-[#7B1131] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span>Care Invoices ({clientInvoices.length})</span>
              </button>
            </div>
            <p className="text-[11px] text-neutral-500">
              {activeLedgerTab === 'stripe'
                ? 'All customer payments processed through live Stripe API.'
                : 'Live invoices synced with client care portals.'}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search transaction or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs w-56 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B1131]"
              />
            </div>
          </div>
        </div>

        {activeLedgerTab === 'stripe' ? (
          /* Stripe Live Transactions Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-200">
                <tr>
                  <th className="p-4">Customer &amp; Contact</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Service / Items</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Gateway Ref / Intent ID</th>
                  <th className="p-4">Date &amp; Time</th>
                  <th className="p-4 text-right">Amount Paid</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-sans">
                {stripeOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-neutral-400">
                      No live transactions recorded yet. When a customer pays for a product or service via UPI, Card, or Net Banking, it will appear here instantly!
                    </td>
                  </tr>
                ) : (
                  stripeOrders
                    .filter((ord) => {
                      if (!searchQuery) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        ord.customerName.toLowerCase().includes(q) ||
                        ord.orderNumber.toLowerCase().includes(q) ||
                        (ord.stripePaymentIntentId && ord.stripePaymentIntentId.toLowerCase().includes(q)) ||
                        ord.customerPhone.toLowerCase().includes(q)
                      );
                    })
                    .map((ord) => {
                      const sym = ord.currency === 'SGD' ? 'SGD $' : '₹';
                      return (
                        <tr key={ord.id} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-neutral-900">{ord.customerName}</div>
                            <div className="text-[10px] text-neutral-400 font-mono">
                              {ord.customerPhone} • {ord.customerEmail}
                            </div>
                          </td>
                          <td className="p-4">
                            {ord.orderType === 'service' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                🌿 Service
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                                🛍️ Product
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-800">
                              {ord.orderType === 'service'
                                ? ord.serviceDetails?.serviceTitle || ord.items[0]?.title
                                : ord.items.map((i) => `${i.title} x${i.quantity}`).join(', ')}
                            </div>
                            <div className="text-[10px] text-neutral-400">
                              Order #{ord.orderNumber}
                            </div>
                          </td>
                          <td className="p-4">
                            {ord.paymentMethod === 'upi' ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 inline-flex items-center space-x-1">
                                <span>📱 UPI / QR / GPay</span>
                              </span>
                            ) : ord.paymentMethod === 'netbanking' ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 inline-flex items-center space-x-1">
                                <span>🏦 Net Banking</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-300 inline-flex items-center space-x-1">
                                <span>💳 ATM / Card (Stripe)</span>
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="font-mono text-[11px] text-neutral-700 bg-neutral-100 px-2 py-1 rounded inline-block">
                              {ord.stripePaymentIntentId || 'Verified Online'}
                            </div>
                          </td>
                          <td className="p-4 text-neutral-600">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-emerald-800">
                            {sym}{ord.totalAmount.toLocaleString()}
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Paid (Live)</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Care Invoices Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-200">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Package / Description</th>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Due Date</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-right">Balance Due</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans">
              {filteredInvoices.map((item) => (
                <tr key={item.invoice.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-neutral-900">{item.clientName}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{item.clientId}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-neutral-800">{item.invoice.packageTitle}</div>
                  </td>
                  <td className="p-4 font-mono text-neutral-600">{item.invoice.invoiceNumber}</td>
                  <td className="p-4 text-neutral-600">{item.invoice.dueDate}</td>
                  <td className="p-4 text-right font-mono font-bold text-neutral-900">
                    ₹{item.invoice.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-rose-700">
                    ₹{item.invoice.balanceDue.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      item.invoice.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.invoice.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {item.invoice.status !== 'paid' ? (
                      <button
                        type="button"
                        onClick={() => {
                          updateInvoice(item.clientId, item.invoice.id, {
                            status: 'paid',
                            paidAmount: item.invoice.totalAmount,
                            balanceDue: 0,
                            receiptNumber: `RCPT-${Date.now().toString().slice(-6)}`,
                          });
                          showToast(`Invoice ${item.invoice.invoiceNumber} marked as Paid!`);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg shadow-xs transition-colors"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          updateInvoice(item.clientId, item.invoice.id, {
                            status: 'pending_milestone',
                            paidAmount: 0,
                            balanceDue: item.invoice.totalAmount,
                          });
                          showToast(`Invoice ${item.invoice.invoiceNumber} marked as Pending.`);
                        }}
                        className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-bold text-[10px] rounded-lg transition-colors"
                      >
                        Mark Unpaid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

      {/* New Invoice Modal */}
      {isNewInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-5">
            <h3 className="font-serif font-bold text-lg text-neutral-900">Issue Custom Payment Invoice</h3>
            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Select Client</label>
                <select
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                >
                  {Object.values(allClientData).map((c) => (
                    <option key={c.clientId} value={c.clientId}>{c.clientName} ({c.location})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Service / Package Description</label>
                <input
                  required
                  placeholder="e.g. 2nd Installment - Sacred Confinement"
                  value={newInvTitle}
                  onChange={(e) => setNewInvTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="24000"
                    value={newInvAmount}
                    onChange={(e) => setNewInvAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-600 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newInvDue}
                    onChange={(e) => setNewInvDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewInvoiceOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-md"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
