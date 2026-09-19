'use client';

import React from 'react';
import { 
  BarChart3, TrendingUp, Users, ShoppingBag, 
  Award, Download, Calendar, ArrowUpRight, 
  CheckCircle2, Globe, Heart, Shield
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { usePortalData } from '../../context/PortalDataContext';

export const AdminReportsAnalytics: React.FC = () => {
  const { services, products, orders } = useAdminData();
  const { allClientData } = usePortalData();

  const totalClients = Object.keys(allClientData).length;
  const totalOrders = orders.length;

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value,Period\n"
      + `Total Registered Clients,${totalClients},All Time\n`
      + `Total Store Orders,${totalOrders},All Time\n`
      + `Active Services in Catalog,${services.length},Live\n`
      + `Active Botanical Products,${products.length},Live\n`
      + "Client Satisfaction Rating,99.2%,Current\n"
      + "Primary Location,Chennai / Singapore,2026\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SEYOL_Analytics_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7B1131]">
            Executive Intelligence
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d]">
            Reports &amp; Analytics
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Clinical care metrics, product sales performance, regional family distributions, and growth analytics.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-5 py-2.5 bg-white border border-neutral-200 hover:border-[#7B1131] text-[#7B1131] hover:bg-neutral-50 font-bold text-xs rounded-xl flex items-center space-x-2 shadow-xs cursor-pointer transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics (CSV)</span>
        </button>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Families Supported</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold">+18% MoM</span>
          </div>
          <div className="text-2xl font-serif font-black text-[#7B1131] mt-1">2,400+</div>
          <div className="text-[11px] text-neutral-500 mt-1">Across India &amp; Singapore</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Postpartum Care Completion</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold">Optimal</span>
          </div>
          <div className="text-2xl font-serif font-black text-neutral-900 mt-1">98.4%</div>
          <div className="text-[11px] text-neutral-500 mt-1">Successful Involution &amp; Binding</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Client Satisfaction Score</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold">5.0 ★</span>
          </div>
          <div className="text-2xl font-serif font-black text-amber-600 mt-1">99.2%</div>
          <div className="text-[11px] text-neutral-500 mt-1">Matron Care Quality Rating</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Average Order Value</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold">+12%</span>
          </div>
          <div className="text-2xl font-serif font-black text-neutral-900 mt-1">₹3,450</div>
          <div className="text-[11px] text-neutral-500 mt-1">Botanicals &amp; Postnatal Oils</div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly Enrolment Trend (Visual CSS Bar Chart) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-neutral-900">Monthly Care Enrollments</h3>
              <p className="text-xs text-neutral-500">Number of families enrolled for in-home care &amp; doula packages.</p>
            </div>
            <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-xl">2026 Year-to-Date</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { month: 'May 2026', count: 28, pct: '56%', revenue: '₹13.4 L' },
              { month: 'Jun 2026', count: 34, pct: '68%', revenue: '₹16.3 L' },
              { month: 'Jul 2026', count: 42, pct: '84%', revenue: '₹20.1 L' },
              { month: 'Aug 2026', count: 48, pct: '96%', revenue: '₹23.0 L' },
              { month: 'Sep 2026 (Projected)', count: 52, pct: '100%', revenue: '₹24.9 L' },
            ].map((bar) => (
              <div key={bar.month} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-neutral-700">
                  <span>{bar.month}</span>
                  <span className="text-[#7B1131] font-mono">{bar.count} Mothers ({bar.revenue})</span>
                </div>
                <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7B1131] to-[#E9C377] rounded-full transition-all duration-500" 
                    style={{ width: bar.pct }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revenue Split Donut Simulation */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
          <div>
            <h3 className="font-serif font-bold text-base text-neutral-900">Revenue Split</h3>
            <p className="text-xs text-neutral-500">Care services vs botanical formulations.</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-3">
            <div className="w-32 h-32 rounded-full border-8 border-[#7B1131] border-r-[#E9C377] mx-auto flex items-center justify-center font-serif font-black text-lg text-[#7B1131]">
              72% Care
            </div>
            <div className="text-xs text-neutral-600 font-semibold">
              72% Sacred Postpartum Care <br />
              28% Handcrafted Herbal Botanicals
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B1131]" />
                <span className="font-bold text-neutral-800">In-Home Confinement</span>
              </span>
              <span className="font-bold font-mono">₹48,000 avg</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E9C377]" />
                <span className="font-bold text-neutral-800">Botanical Oils &amp; Bath</span>
              </span>
              <span className="font-bold font-mono">₹3,450 avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional & Top Products Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Regional Demographics */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-[#7B1131]" />
            <h3 className="font-serif font-bold text-base text-neutral-900">Regional Client Distribution</h3>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { region: 'Chennai & Tamil Nadu', share: '56%', count: '1,340+ Families' },
              { region: 'Singapore & Malaysia', share: '24%', count: '580+ Families' },
              { region: 'Bangalore & Karnataka', share: '13%', count: '310+ Families' },
              { region: 'NRI Consultations (US, UK, UAE)', share: '7%', count: '170+ Families' },
            ].map((reg) => (
              <div key={reg.region} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-800">{reg.region}</div>
                  <div className="text-[10px] text-neutral-400">{reg.count}</div>
                </div>
                <span className="font-serif font-bold text-sm text-[#7B1131]">{reg.share}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Botanical Products */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#7B1131]" />
            <h3 className="font-serif font-bold text-base text-neutral-900">Top Botanical Formulations</h3>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { name: 'Soothing Baby Massage Oil (Nilgiri Pure)', rating: '4.9 ★', volume: '200 ml', tag: '#1 Bestseller' },
              { name: 'Sacred 40-Day Confinement Body Oil', rating: '5.0 ★', volume: '500 ml', tag: 'High Demand' },
              { name: 'Traditional Nalangu Maavu Herbal Bath Powder', rating: '4.8 ★', volume: '250 g', tag: 'Popular Combo' },
              { name: 'Gentle Colic & Tummy Comfort Oil', rating: '4.9 ★', volume: '100 ml', tag: 'Essential' },
            ].map((prod, idx) => (
              <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-neutral-800 line-clamp-1">{prod.name}</div>
                  <div className="text-[10px] text-neutral-400">{prod.volume} · {prod.rating}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 shrink-0">
                  {prod.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
