'use client';

import React, { useMemo } from 'react';
import { 
  BarChart3, Users, ShoppingBag, Download, 
  Calendar, CheckCircle2, TrendingUp, Clock, 
  Layers, CreditCard, Shield, AlertCircle
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { usePortalData } from '../../context/PortalDataContext';

export const AdminReportsAnalytics: React.FC = () => {
  const { services, products, orders } = useAdminData();
  const { allClientData } = usePortalData();

  // ─── 1. Real Telemetry Calculations ───────────────────────────────────────
  const clientsList = useMemo(() => Object.values(allClientData), [allClientData]);
  const totalClients = clientsList.length;

  // Real Invoices & Care Revenue
  const careFinancials = useMemo(() => {
    let paidTotal = 0;
    let pendingTotal = 0;
    let invoiceCount = 0;

    clientsList.forEach((c) => {
      (c.invoices || []).forEach((inv) => {
        invoiceCount++;
        if (inv.status === 'paid') {
          paidTotal += inv.totalAmount || 0;
        } else {
          paidTotal += inv.paidAmount || 0;
          pendingTotal += inv.balanceDue || 0;
        }
      });
    });

    return { paidTotal, pendingTotal, invoiceCount };
  }, [clientsList]);

  // Real Store Orders Revenue
  const storeFinancials = useMemo(() => {
    const validOrders = orders.filter((o) => o.orderStatus !== 'cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const averageOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

    const pending = orders.filter((o) => o.orderStatus === 'pending').length;
    const processing = orders.filter((o) => o.orderStatus === 'processing' || o.orderStatus === 'packed' || o.orderStatus === 'accepted').length;
    const inTransit = orders.filter((o) => o.orderStatus === 'shipped').length;
    const completed = orders.filter((o) => o.orderStatus === 'delivered' || o.orderStatus === 'completed').length;
    const cancelled = orders.filter((o) => o.orderStatus === 'cancelled').length;

    return {
      validOrdersCount: validOrders.length,
      totalRevenue,
      averageOrderValue,
      stages: { pending, processing, inTransit, completed, cancelled }
    };
  }, [orders]);

  // Combined Genuine Financials
  const grossRevenue = careFinancials.paidTotal + storeFinancials.totalRevenue;
  const bestsellerCount = products.filter((p) => p.isBestseller).length;

  // ─── 2. CSV Export with Real Telemetry ─────────────────────────────────────
  const handleExportCSV = () => {
    const lines = [
      'SEYOL CLINICAL & COMMERCE EXECUTIVE REPORT',
      `Generated On,${new Date().toLocaleString('en-IN')}`,
      '',
      'CORE REVENUE SUMMARY',
      `Gross Collected Revenue (INR),₹${grossRevenue.toLocaleString('en-IN')}`,
      `Clinical Care Package Revenue,₹${careFinancials.paidTotal.toLocaleString('en-IN')}`,
      `Botanical Store Orders Revenue,₹${storeFinancials.totalRevenue.toLocaleString('en-IN')}`,
      `Care Billing Pending Balances,₹${careFinancials.pendingTotal.toLocaleString('en-IN')}`,
      '',
      'ACTIVITY & METRICS',
      `Total Registered Client Portals,${totalClients}`,
      `Total Store Orders Received,${orders.length}`,
      `Average Store Order Value (AOV),₹${storeFinancials.averageOrderValue}`,
      `Active Clinical Services Catalog,${services.length}`,
      `Formulated Botanical SKUs,${products.length}`,
      `Bestselling Formulations,${bestsellerCount}`,
      '',
      'STORE ORDER PIPELINE BREAKDOWN',
      `Received / Pending,${storeFinancials.stages.pending}`,
      `In Processing & Packed,${storeFinancials.stages.processing}`,
      `Out for Delivery (Shipped),${storeFinancials.stages.inTransit}`,
      `Delivered & Completed,${storeFinancials.stages.completed}`,
      `Cancelled Orders,${storeFinancials.stages.cancelled}`,
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(lines.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `SEYOL_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B1131]">
            Executive Intelligence
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
            Reports &amp; Operational Analytics
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Real telemetry derived directly from clinical portal clients, store orders, and live billing records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#7B1131] text-stone-800 hover:text-[#7B1131] text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#C89D4B]" />
          <span>Export Telemetry (CSV)</span>
        </button>
      </div>

      {/* Primary KPI Grid (All Real Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Gross Collected Revenue
            </span>
            <CreditCard className="w-4 h-4 text-[#7B1131]" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 pt-1">
            ₹{grossRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500">
            Store Orders + Care Invoices
          </div>
        </div>

        {/* Registered Portal Clients */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Registered Mothers &amp; Clients
            </span>
            <Users className="w-4 h-4 text-[#7B1131]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#7B1131] pt-1">
            {totalClients}
          </div>
          <div className="text-[11px] text-stone-500">
            Active in SEYOL Care Portal
          </div>
        </div>

        {/* Store Orders Volume */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Total Store Orders
            </span>
            <ShoppingBag className="w-4 h-4 text-[#7B1131]" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 pt-1">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-500">
            {storeFinancials.validOrdersCount} confirmed &amp; fulfilled
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Average Order Value (AOV)
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900 pt-1">
            ₹{storeFinancials.averageOrderValue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-stone-500">
            Calculated across verified orders
          </div>
        </div>
      </div>

      {/* Section 2: Order Pipeline Health & Catalog Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Fulfillment Pipeline Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                Order Fulfillment Pipeline
              </h2>
              <p className="text-xs text-stone-500">Live operational status across all received store orders</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
              {orders.length} Orders
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <span className="font-semibold text-amber-900">1. Received / Pending Review</span>
              <span className="font-bold font-mono text-amber-950">{storeFinancials.stages.pending}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60">
              <span className="font-semibold text-blue-900">2. In Preparation &amp; Packaging</span>
              <span className="font-bold font-mono text-blue-950">{storeFinancials.stages.processing}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/60">
              <span className="font-semibold text-purple-900">3. In Transit (Out for Delivery)</span>
              <span className="font-bold font-mono text-purple-950">{storeFinancials.stages.inTransit}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
              <span className="font-semibold text-emerald-900">4. Delivered &amp; Completed</span>
              <span className="font-bold font-mono text-emerald-950">{storeFinancials.stages.completed}</span>
            </div>

            {storeFinancials.stages.cancelled > 0 && (
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-500">
                <span>Cancelled / Refunded</span>
                <span className="font-mono font-bold">{storeFinancials.stages.cancelled}</span>
              </div>
            )}
          </div>
        </div>

        {/* Catalog Inventory & Billing Integrity */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                Catalog &amp; Billing Ledger Health
              </h2>
              <p className="text-xs text-stone-500">Real-time status of service offerings and botanical stock</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700">
              {services.length + products.length} Items
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Active Services
              </span>
              <div className="text-xl font-bold font-serif text-stone-900">
                {services.length}
              </div>
              <span className="text-[11px] text-stone-500 block">Doula &amp; Confinement</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Botanical Products
              </span>
              <div className="text-xl font-bold font-serif text-stone-900">
                {products.length}
              </div>
              <span className="text-[11px] text-stone-500 block">Formulated SKUs</span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Bestselling Formulas
              </span>
              <div className="text-xl font-bold font-serif text-emerald-700">
                {bestsellerCount}
              </div>
              <span className="text-[11px] text-stone-500 block">
                Highlighted in Store
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Outstanding Balance Due
              </span>
              <div className="text-xl font-bold font-serif text-amber-700">
                ₹{careFinancials.pendingTotal.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-stone-500 block">Pending invoice receipts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
