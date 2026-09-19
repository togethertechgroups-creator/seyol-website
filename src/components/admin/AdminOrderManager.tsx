'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingCart, Clock, CheckCircle2, XCircle, Truck, Package, 
  CheckCheck, AlertTriangle, Search, Filter, Phone, Mail, MapPin, 
  ExternalLink, MessageCircle, Eye, Trash2, Printer, Volume2, 
  VolumeX, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Send, 
  FileText, ShieldCheck, ChevronRight, ChevronDown, MoreVertical, AlertCircle, Plus, X
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { ProductOrder, OrderStatus, PaymentStatus } from '../../types';

// Audio Chime Generator using standard Web Audio API (cross-browser compatible)
const playOrderChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    
    // Note 1: C5 (523.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Note 2: E5 (659.25 Hz) - higher bell chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.15);
    gain2.gain.setValueAtTime(0.25, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.65);
  } catch (e) {
    // Audio context may be blocked by browser autoplay policy until interaction
  }
};

const ORDER_STAGES: { id: OrderStatus; label: string; step: number; icon: string }[] = [
  { id: 'pending', label: '1. Received', step: 1, icon: '📥' },
  { id: 'accepted', label: '2. Accepted', step: 2, icon: '✅' },
  { id: 'processing', label: '3. Processing', step: 3, icon: '🧪' },
  { id: 'packed', label: '4. Packed', step: 4, icon: '📦' },
  { id: 'shipped', label: '5. Out for Delivery', step: 5, icon: '🚚' },
  { id: 'delivered', label: '6. Delivered', step: 6, icon: '🏡' },
  { id: 'completed', label: '7. Completed', step: 7, icon: '🎉' },
];

export const DEFAULT_COURIER_PARTNERS: string[] = [
  'BlueDart Express',
  'Delhivery Surface & Air',
  'DTDC Premium',
  'The Professional Couriers',
  'ST Courier (Tamil Nadu & South India)',
  'India Post Speed Post',
  'Dunzo Local Chennai Delivery',
  'Porter Local Delivery',
  'Shadowfax Logistics',
  'Xpressbees Logistics',
];

export const AdminOrderManager: React.FC = () => {
  const { orders, addOrder, updateOrderStatus, updatePaymentStatus, deleteOrder } = useAdminData();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState<'all' | 'pending' | 'shipped' | 'delivered' | 'completed'>('all');
  const [filterType, setFilterType] = useState<'all' | 'products' | 'services'>('all');

  // Sound alert toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Selected Order for Full Modal Inspection & Actions
  const [selectedOrder, setSelectedOrder] = useState<ProductOrder | null>(null);

  // Rejection Dialog State
  const [rejectingOrder, setRejectingOrder] = useState<ProductOrder | null>(null);
  const [rejectReason, setRejectReason] = useState('Handcrafted botanical formula currently in seasonal batch curing');

  // Shipping Dialog & Dynamic Courier Company State
  const [shippingOrder, setShippingOrder] = useState<ProductOrder | null>(null);
  const [courierName, setCourierName] = useState('BlueDart Express');
  const [trackingId, setTrackingId] = useState('');
  const [trackingError, setTrackingError] = useState(false);
  const [courierList, setCourierList] = useState<string[]>(DEFAULT_COURIER_PARTNERS);
  const [isAddingCourier, setIsAddingCourier] = useState(false);
  const [newCourierName, setNewCourierName] = useState('');

  // Sync courierList from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('seyol_courier_companies_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCourierList(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleAddCourier = (customName?: string) => {
    const name = (customName !== undefined ? customName : newCourierName).trim();
    if (!name) return;

    const existing = courierList.find((c) => c.toLowerCase() === name.toLowerCase());
    if (existing) {
      setCourierName(existing);
      setIsAddingCourier(false);
      setNewCourierName('');
      showToast(`Selected "${existing}"`);
      return;
    }

    const updated = [...courierList, name];
    setCourierList(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('seyol_courier_companies_v1', JSON.stringify(updated));
      } catch (e) {}
    }
    setCourierName(name);
    setIsAddingCourier(false);
    setNewCourierName('');
    showToast(`✅ Added "${name}" to Courier Companies!`);
  };

  const handleDeleteCourier = (nameToDelete: string) => {
    if (courierList.length <= 1) {
      showToast('At least one courier company must remain.');
      return;
    }
    const updated = courierList.filter((c) => c !== nameToDelete);
    setCourierList(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('seyol_courier_companies_v1', JSON.stringify(updated));
      } catch (e) {}
    }
    if (courierName === nameToDelete) {
      setCourierName(updated[0]);
    }
    showToast(`Removed "${nameToDelete}"`);
  };

  // Toast Feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Monitor for new orders to trigger audio chime
  const previousOrdersCount = useRef(orders.length);
  useEffect(() => {
    if (orders.length > previousOrdersCount.current) {
      const newest = orders[0];
      if (newest && newest.orderStatus === 'pending') {
        if (soundEnabled) {
          playOrderChime();
        }
        showToast(`🔔 New Order Received: #${newest.orderNumber} from ${newest.customerName}!`);
      }
    }
    previousOrdersCount.current = orders.length;
  }, [orders, soundEnabled]);

  // Keep selectedOrder in sync with context, auto-select first order if none selected
  useEffect(() => {
    if (!selectedOrder && orders.length > 0) {
      setSelectedOrder(orders[0]);
    } else if (selectedOrder) {
      const updated = orders.find((o) => o.id === selectedOrder.id);
      if (updated) setSelectedOrder(updated);
    }
  }, [orders, selectedOrder]);

  // Pending & Stage counts
  const pendingCount = useMemo(() => orders.filter((o) => o.orderStatus === 'pending').length, [orders]);
  const shippedCount = useMemo(() => orders.filter((o) => o.orderStatus === 'shipped').length, [orders]);
  const deliveredCount = useMemo(() => orders.filter((o) => o.orderStatus === 'delivered').length, [orders]);
  const completedCount = useMemo(() => orders.filter((o) => o.orderStatus === 'completed').length, [orders]);
  const servicesCount = useMemo(() => orders.filter((o) => o.orderType === 'service').length, [orders]);
  const productsCount = useMemo(() => orders.filter((o) => o.orderType !== 'service').length, [orders]);
  const stripePaidCount = useMemo(() => orders.filter((o) => o.paymentStatus === 'paid' && (o.stripePaymentIntentId || o.paymentMethod === 'stripe')).length, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      // Type filter
      if (filterType === 'products' && ord.orderType === 'service') return false;
      if (filterType === 'services' && ord.orderType !== 'service') return false;

      // Stage filter
      if (filterStage === 'pending' && ord.orderStatus !== 'pending') return false;
      if (filterStage === 'shipped' && ord.orderStatus !== 'shipped') return false;
      if (filterStage === 'delivered' && ord.orderStatus !== 'delivered') return false;
      if (filterStage === 'completed' && ord.orderStatus !== 'completed') return false;

      // Text query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerPhone.toLowerCase().includes(q) ||
        ord.customerEmail.toLowerCase().includes(q) ||
        (ord.stripePaymentIntentId && ord.stripePaymentIntentId.toLowerCase().includes(q)) ||
        (ord.serviceDetails?.serviceTitle && ord.serviceDetails.serviceTitle.toLowerCase().includes(q)) ||
        (ord.serviceDetails?.packageName && ord.serviceDetails.packageName.toLowerCase().includes(q)) ||
        ord.shippingAddress.city.toLowerCase().includes(q) ||
        ord.shippingAddress.street.toLowerCase().includes(q) ||
        ord.shippingAddress.pincode.toLowerCase().includes(q)
      );
    });
  }, [orders, filterType, filterStage, searchQuery]);

  // Handler: Accept Order
  const handleAcceptOrder = (order: ProductOrder) => {
    updateOrderStatus(order.id, 'accepted', 'Order accepted by Admin. Preparation initiated.');
    showToast(`✅ Order #${order.orderNumber} ACCEPTED!`);
  };

  // Handler: Confirm Rejection
  const handleConfirmReject = () => {
    if (!rejectingOrder) return;
    updateOrderStatus(rejectingOrder.id, 'rejected', `Order rejected by Admin. Reason: ${rejectReason}`, {
      rejectReason: rejectReason,
    });
    showToast(`Order #${rejectingOrder.orderNumber} marked as REJECTED.`);
    setRejectingOrder(null);
  };

  // Handler: Advance to Processing
  const handleAdvanceToProcessing = (order: ProductOrder) => {
    updateOrderStatus(order.id, 'processing', 'Botanical formulations moving through infusion and preparation.');
    showToast(`🧪 Order #${order.orderNumber} is now in PROCESSING`);
  };

  // Handler: Advance to Packed
  const handleAdvanceToPacked = (order: ProductOrder) => {
    updateOrderStatus(order.id, 'packed', 'Package secured with tamper-evident seal and newborn care card.');
    showToast(`📦 Order #${order.orderNumber} is PACKED & LABELED`);
  };

  // Handler: Confirm Shipped
  const handleConfirmShipped = () => {
    if (!shippingOrder) return;
    if (!trackingId.trim()) {
      setTrackingError(true);
      showToast('⚠️ Tracking / AWB Number is mandatory!');
      return;
    }
    const finalCourier = courierName.trim() || 'BlueDart Express';
    updateOrderStatus(shippingOrder.id, 'shipped', `Dispatched with ${finalCourier}. Tracking: ${trackingId.trim()}`, {
      courierPartner: finalCourier,
      trackingNumber: trackingId.trim(),
    });
    setFilterStage('shipped');
    showToast(`🚚 Order #${shippingOrder.orderNumber} is SHIPPED / OUT FOR DELIVERY with ${finalCourier}!`);
    setShippingOrder(null);
    setIsAddingCourier(false);
    setTrackingError(false);
  };

  // Handler: Mark Delivered
  const handleMarkDelivered = (order: ProductOrder) => {
    updateOrderStatus(order.id, 'delivered', 'Package delivered safely to customer doorstep.');
    // Automatically switch active filter to 'delivered' so the user immediately sees the order in the Delivered tab
    setFilterStage('delivered');
    showToast(`🏡 Order #${order.orderNumber} marked as DELIVERED!`);
  };

  // Handler: Mark Completed
  const handleMarkCompleted = (order: ProductOrder) => {
    updateOrderStatus(order.id, 'completed', 'Order fulfilled and archived successfully.');
    // Automatically switch active filter to 'completed' so the user immediately sees the order in Completed
    setFilterStage('completed');
    showToast(`🎉 Order #${order.orderNumber} COMPLETED!`);
  };

  // Handler: Simulate Incoming Order for Admin Testing
  const handleSimulateNewOrder = () => {
    const mockNames = ['Deepika Sundaram', 'Kavitha Ramachandran', 'Ananya Natarajan', 'Pooja Venkatesh', 'Meera Jayaraman'];
    const mockCities = ['Chennai, TN', 'Coimbatore, TN', 'Madurai, TN', 'Bangalore, KA', 'Tiruchirappalli, TN'];
    const chosenName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const chosenCity = mockCities[Math.floor(Math.random() * mockCities.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    const simulated: ProductOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `SEY-${randomNum}`,
      createdAt: new Date().toISOString(),
      customerName: chosenName,
      customerPhone: `+91 9840${Math.floor(100000 + Math.random() * 900000)}`,
      customerEmail: `${chosenName.toLowerCase().replace(' ', '.')}@gmail.com`,
      shippingAddress: {
        street: 'Flat 4B, Lotus Apartments, 3rd Cross Street',
        city: chosenCity.split(',')[0],
        state: chosenCity.split(',')[1].trim(),
        pincode: '600034',
      },
      items: [
        {
          productId: 'prod-1',
          title: 'Soothing Baby Massage Oil',
          volumeOrType: '200ml Glass Bottle',
          price: 850,
          quantity: 1,
          image: '/images/products-hero-banner.png',
        },
        {
          productId: 'prod-2',
          title: "Mother's Postpartum Herbal Bath Infusion",
          volumeOrType: '500g Eco-Pouch',
          price: 1100,
          quantity: 1,
          image: '/images/products-hero-banner.png',
        },
      ],
      subtotal: 1950,
      discount: 100,
      shippingFee: 0,
      totalAmount: 1850,
      paymentMethod: 'cod',
      paymentStatus: 'cod',
      orderStatus: 'pending',
      notes: 'Please ensure gentle packaging. Expecting mother delivery next week.',
      timeline: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: 'New order placed via SEYOL storefront cart.',
        },
      ],
    };
    addOrder(simulated);
    setSelectedOrder(simulated);
  };

  // Helper to generate status badge styling matching POS reference
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-orange-50 text-[#e85d47] border-orange-200/80',
          label: '🟡 New Order Received',
          chip: 'New',
        };
      case 'accepted':
      case 'confirmed':
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200/80',
          label: '🔵 Order Accepted',
          chip: 'Accepted',
        };
      case 'processing':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
          label: '🧪 Processing',
          chip: 'In Prep',
        };
      case 'packed':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          label: '📦 Packed & Sealed',
          chip: 'Packed',
        };
      case 'shipped':
        return {
          bg: 'bg-violet-50 text-violet-700 border-violet-200/80',
          label: '🚚 Out for Delivery',
          chip: 'Out for Delivery',
        };
      case 'delivered':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          label: '🏡 Delivered',
          chip: 'Delivered',
        };
      case 'completed':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          label: '🎉 Order Completed',
          chip: 'Completed',
        };
      case 'rejected':
      case 'cancelled':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
          label: '🔴 Order Rejected',
          chip: 'Rejected',
        };
      default:
        return {
          bg: 'bg-neutral-50 text-neutral-700 border-neutral-200',
          label: status,
          chip: status,
        };
    }
  };

  // WhatsApp contextual message generator
  const getWhatsAppMessage = (order: ProductOrder) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    let text = `Hello ${order.customerName}! Greetings from SEYOL Sacred Mother & Baby Care.\n\n`;
    text += `Regarding your Order *#${order.orderNumber}* (Total: ₹${order.totalAmount}):\n`;

    if (order.orderStatus === 'pending') {
      text += `Status: *NEW ORDER RECEIVED*\nWe have received your order details and our care team is reviewing it right now!`;
    } else if (order.orderStatus === 'accepted' || order.orderStatus === 'confirmed') {
      text += `Status: *ORDER ACCEPTED*\nYour order has been officially accepted! Our apothecary is preparing your handcrafted botanical formulations with love and sacred care.`;
    } else if (order.orderStatus === 'processing') {
      text += `Status: *PROCESSING / IN BOTANICAL PREPARATION*\nYour wellness items are currently being freshly blended and bottled in clean sterile apothecary conditions.`;
    } else if (order.orderStatus === 'packed') {
      text += `Status: *PACKED & SEALED*\nYour parcel has been packaged in cushioned eco-packaging with tamper-evident seal, ready for courier dispatch!`;
    } else if (order.orderStatus === 'shipped') {
      text += `Status: *OUT FOR DELIVERY / SHIPPED*\nCourier: *${order.courierPartner || 'Express Care Courier'}*\nTracking: *${order.trackingNumber || 'In Transit'}*\nYour package is on its way to your doorstep!`;
    } else if (order.orderStatus === 'delivered') {
      text += `Status: *DELIVERED*\nYour SEYOL package has been delivered safely! We hope these pure botanicals nurture mother and baby beautifully. Please reach out if you need ritual guidance!`;
    } else if (order.orderStatus === 'completed') {
      text += `Status: *ORDER COMPLETED*\nThank you for trusting SEYOL Sacred Mother & Baby Care!`;
    } else if (order.orderStatus === 'rejected') {
      text += `Status: *UNABLE TO FULFILL*\nReason: ${order.rejectReason || 'Seasonal botanical curing'}\nPlease contact us if you need alternative recommendations.`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#7B1131] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 border border-amber-300/40 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Real-time Order Action Banner if pending orders exist */}
      {pendingCount > 0 && (
        <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/10 border-2 border-amber-400/80 p-4 sm:p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
              🔔
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  Action Required
                </span>
                <span className="text-xs font-bold text-amber-900 font-mono">
                  {pendingCount} New Order{pendingCount > 1 ? 's' : ''} Received
                </span>
              </div>
              <p className="text-xs text-neutral-700 mt-0.5">
                New customer orders awaiting review. Accept to initiate preparation or Reject with reason.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => setFilterStage('pending')}
              className="px-4 py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>Review New Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar: Orders title, Search, Stage Filter & + New Order (Exact Reference Layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-200/80">
        <div className="flex items-center space-x-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d1d] tracking-tight">
            Orders
          </h1>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#7B1131]/10 text-[#7B1131]">
            {orders.length}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search bar */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, order or etc"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#7B1131]/20 focus:border-[#7B1131] shadow-2xs"
            />
          </div>

          {/* Stage Dropdown Filter */}
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value as any)}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-neutral-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7B1131]/20 focus:border-[#7B1131] shadow-2xs"
          >
            <option value="all">All ({orders.length})</option>
            <option value="pending">Received Orders ({pendingCount})</option>
            <option value="shipped">Out for Delivery ({shippedCount})</option>
            <option value="delivered">Delivered ({deliveredCount})</option>
            <option value="completed">Completed ({completedCount})</option>
          </select>

          {/* Sound Alert Toggle */}
          <button
            type="button"
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playOrderChime();
              showToast(next ? 'Sound chime alerts ENABLED' : 'Sound alerts MUTED');
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-neutral-100 border-neutral-200 text-neutral-500'
            }`}
            title="Toggle incoming order audio chime"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Chime ON' : 'Muted'}</span>
          </button>

          {/* + New Order Button (matches reference coral button) */}
          <button
            type="button"
            onClick={handleSimulateNewOrder}
            className="px-4 py-2 rounded-xl bg-[#e85d47] hover:bg-[#d64b36] text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Order</span>
          </button>
        </div>
      </div>

      {/* Type Filter Buttons: All / Service Bookings / Product Orders */}
      <div className="flex items-center space-x-2 border-b border-neutral-100 pb-3 flex-wrap gap-y-2">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#7B1131] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          All Orders ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('services')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
            filterType === 'services'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <span>🌿 Service Bookings ({servicesCount})</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('products')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'products'
              ? 'bg-[#7B1131] text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          🛍️ Product Orders ({productsCount})
        </button>
        {stripePaidCount > 0 && (
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 font-bold ml-auto hidden sm:inline-flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{stripePaidCount} Live Stripe Paid</span>
          </span>
        )}
      </div>

      {/* Main Content Workspace: Left Cards Grid + Right Sticky Order Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ======================================================================= */}
        {/* LEFT AREA: 2-COLUMN ORDER CARDS GRID (7 Columns on large screens)       */}
        {/* ======================================================================= */}
        <div className="lg:col-span-7 xl:col-span-7">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-neutral-200 text-center space-y-3">
              <ShoppingCart className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-neutral-700">No Orders Found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No orders match your filter. Switch back to "All" or click "+ New Order" to create one.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOrders.map((ord, idx) => {
                const isSelected = selectedOrder?.id === ord.id;
                const badge = getStatusBadge(ord.orderStatus);
                const badgeLetter = String.fromCharCode(65 + (idx % 3)); // A, B, C
                const badgeNum = (idx % 4) + 1;
                const badgeCode = `${badgeLetter}${badgeNum}`; // e.g. A4, A3, B2 like screenshot!

                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`bg-white rounded-2xl p-4 sm:p-4.5 border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative ${
                      isSelected
                        ? 'border-[#e85d47] ring-2 ring-[#e85d47]/20 shadow-md bg-orange-50/10'
                        : 'border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    {/* Card Top: Square Avatar Badge + Customer & Order ID + Status Pill */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#e85d47] font-black text-xs flex items-center justify-center shrink-0">
                            {badgeCode}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-neutral-900 truncate">
                              {ord.customerName}
                            </h4>
                            <p className="text-[10px] text-neutral-400 font-mono">
                              Order #{ord.orderNumber}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 shrink-0 flex-wrap justify-end gap-y-1">
                          {ord.orderType === 'service' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              🌿 Service
                            </span>
                          )}
                          {(ord.stripePaymentIntentId || ord.paymentMethod === 'stripe') && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                              ✓ Stripe Paid
                            </span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                            {badge.chip}
                          </span>
                        </div>
                      </div>

                      {/* Subtitle Date & Time */}
                      <div className="text-[10px] text-neutral-400 font-medium mt-2">
                        {new Date(ord.createdAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })} at {new Date(ord.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>

                      {/* Items Preview Table (Matches reference screenshot) */}
                      <div className="mt-3 text-[11px]">
                        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 pb-1 border-b border-neutral-100">
                          <span>Items</span>
                          <div className="flex items-center space-x-6">
                            <span>Qty</span>
                            <span>Price</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-1.5">
                          {ord.items.slice(0, 3).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center justify-between text-neutral-700">
                              <span className="truncate max-w-[130px] font-medium text-neutral-800">
                                {item.title}
                              </span>
                              <div className="flex items-center space-x-7 font-mono shrink-0">
                                <span className="text-neutral-500 w-3 text-center">{item.quantity}</span>
                                <span className="font-bold text-neutral-800 w-12 text-right">₹{item.price * item.quantity}</span>
                              </div>
                            </div>
                          ))}
                          {ord.items.length > 3 && (
                            <div className="text-[10px] text-neutral-400 italic">
                              + {ord.items.length - 3} more items...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Total & Actions (See Details & Next Stage Action) */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase block">Total</span>
                        <span className="font-black text-sm text-[#3a1d1d] font-mono">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(ord);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs cursor-pointer transition-colors"
                        >
                          See Details
                        </button>

                        {/* Next Stage Action Buttons */}
                        {ord.orderStatus === 'pending' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAcceptOrder(ord);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#e85d47] hover:bg-[#d64b36] text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                          >
                            Accept
                          </button>
                        )}
                        {(ord.orderStatus === 'accepted' || ord.orderStatus === 'confirmed') && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdvanceToProcessing(ord);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#e85d47] hover:bg-[#d64b36] text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                          >
                            Start Prep
                          </button>
                        )}
                        {ord.orderStatus === 'processing' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdvanceToPacked(ord);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#e85d47] hover:bg-[#d64b36] text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                          >
                            Pack
                          </button>
                        )}
                        {ord.orderStatus === 'packed' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShippingOrder(ord);
                              setTrackingId('');
                              setTrackingError(false);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#e85d47] hover:bg-[#d64b36] text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                          >
                            Dispatch
                          </button>
                        )}
                        {ord.orderStatus === 'shipped' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkDelivered(ord);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                          >
                            Delivered
                          </button>
                        )}
                        {ord.orderStatus === 'delivered' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkCompleted(ord);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                          >
                            Complete
                          </button>
                        )}
                        {ord.orderStatus === 'completed' && (
                          <span className="px-2.5 py-1 rounded-xl bg-teal-50 text-teal-700 font-bold text-[11px] border border-teal-200">
                            Completed ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* RIGHT AREA: FIXED / STICKY ORDER DETAILS INSPECTOR (5 Columns)          */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 xl:col-span-5">
          {selectedOrder ? (
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-4 sticky top-6">
              {/* Header: Title + Status Pill/Select matching reference */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="font-bold text-base text-neutral-900 tracking-tight">
                  Order Details
                </h3>

                {/* Status Dropdown with Colored Status Indicator */}
                <div className="relative flex items-center">
                  <span className={`w-2 h-2 rounded-full absolute left-3 z-10 ${
                    selectedOrder.orderStatus === 'completed' || selectedOrder.orderStatus === 'delivered'
                      ? 'bg-emerald-500'
                      : selectedOrder.orderStatus === 'pending'
                      ? 'bg-amber-500'
                      : selectedOrder.orderStatus === 'rejected' || selectedOrder.orderStatus === 'cancelled'
                      ? 'bg-rose-500'
                      : 'bg-sky-500'
                  }`} />
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => {
                      const st = e.target.value as OrderStatus;
                      updateOrderStatus(selectedOrder.id, st);
                      showToast(`Status updated to ${st.toUpperCase()}`);
                    }}
                    className="appearance-none pl-7 pr-7 py-1.5 rounded-full text-xs font-bold bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 cursor-pointer focus:outline-none transition-colors"
                  >
                    <option value="pending">Received</option>
                    <option value="accepted">Accepted</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Recipient & Order Meta (Exact screenshot layout) */}
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-sm text-neutral-900">
                  Recipient: {selectedOrder.customerName}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })} at {new Date(selectedOrder.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  #{selectedOrder.orderNumber}
                </div>
              </div>

              {/* Contact & Delivery Location Pill */}
              <div className="p-3 bg-neutral-50/90 rounded-2xl border border-neutral-100 text-[11px] text-neutral-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-800">📞 {selectedOrder.customerPhone}</span>
                  <span className="text-neutral-400 truncate max-w-[150px]">{selectedOrder.customerEmail}</span>
                </div>
                <p className="text-neutral-600 leading-snug">
                  📍 {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{' '}
                  <span className="font-bold text-[#7B1131] font-mono">{selectedOrder.shippingAddress.pincode}</span>
                </p>
                {selectedOrder.courierPartner && (
                  <div className="pt-1 text-[10px] font-bold text-purple-800 flex items-center justify-between border-t border-neutral-200/50">
                    <span>🚚 {selectedOrder.courierPartner}</span>
                    <span className="font-mono">AWB: {selectedOrder.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Service Details Card if orderType is service */}
              {selectedOrder.orderType === 'service' && (
                <div className="p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span className="flex items-center space-x-1">
                      <span>🌿 SEYOL Service Booking</span>
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full uppercase font-bold">
                      {selectedOrder.paymentStatus === 'paid' ? 'Paid & Confirmed' : selectedOrder.paymentStatus}
                    </span>
                  </div>
                  {selectedOrder.serviceDetails && (
                    <div className="text-[11px] text-emerald-800 space-y-0.5 pt-1 border-t border-emerald-200/60">
                      <div><strong>Service:</strong> {selectedOrder.serviceDetails.serviceTitle}</div>
                      <div><strong>Package:</strong> {selectedOrder.serviceDetails.packageName} {selectedOrder.serviceDetails.sessions ? `(${selectedOrder.serviceDetails.sessions})` : ''}</div>
                      {selectedOrder.serviceDetails.bookingDate && <div><strong>Preferred Start / EDD:</strong> {selectedOrder.serviceDetails.bookingDate}</div>}
                      {selectedOrder.serviceDetails.recipient && <div><strong>Booking For:</strong> {selectedOrder.serviceDetails.recipient}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* Stripe Payment Live Transaction Box */}
              {selectedOrder.stripePaymentIntentId && (
                <div className="p-3 bg-neutral-900 text-white rounded-2xl text-xs space-y-1 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Stripe Live Gateway Verified</span>
                    </span>
                    <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold uppercase">
                      Success
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-neutral-300 break-all select-all pt-0.5">
                    {selectedOrder.stripePaymentIntentId}
                  </div>
                </div>
              )}

              {/* Itemized Products List with Thumbnails (Reference Screenshot Style) */}
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 overflow-hidden flex items-center justify-center shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as any).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-lg">🌿</span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-neutral-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-400">
                        Category: {item.volumeOrType || 'Botanical Formula'}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <span className="font-bold text-xs text-neutral-900 font-mono">
                        {item.quantity > 1 ? `${item.quantity}x ` : ''}₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculation Breakdown */}
              <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Items ({selectedOrder.items.reduce((acc, it) => acc + it.quantity, 0)})</span>
                  <span className="font-mono font-medium text-neutral-700">₹{selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-500">
                  <span>Delivery / Shipping</span>
                  <span className="font-mono font-medium text-neutral-700">
                    {selectedOrder.shippingFee === 0 ? 'Free' : `₹${selectedOrder.shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-100">
                  <span className="font-bold text-sm text-neutral-900">Total</span>
                  <span className="font-black text-lg text-neutral-900 font-mono">
                    ₹{selectedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Print Bill + WhatsApp & Workflow Actions */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center space-x-2">
                  {/* Coral Print Bill button matching reference */}
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-xl bg-[#e85d47] hover:bg-[#d64b36] text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Bill</span>
                  </button>

                  {/* WhatsApp Customer Button */}
                  <a
                    href={getWhatsAppMessage(selectedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                    title="Send WhatsApp update to customer"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {/* Delete Order Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete order #${selectedOrder.orderNumber}? This cannot be undone.`)) {
                        deleteOrder(selectedOrder.id);
                        showToast(`Order #${selectedOrder.orderNumber} deleted`);
                        setSelectedOrder(null);
                      }
                    }}
                    className="p-3 rounded-xl bg-neutral-100 hover:bg-rose-50 text-neutral-400 hover:text-rose-600 border border-neutral-200 transition-colors cursor-pointer"
                    title="Delete order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Next Stage Lifecycle Action in Inspector */}
                <div className="pt-1">
                  {selectedOrder.orderStatus === 'pending' && (
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setRejectingOrder(selectedOrder)}
                        className="flex-1 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer transition-colors"
                      >
                        Reject Order
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAcceptOrder(selectedOrder)}
                        className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                      >
                        Accept Order
                      </button>
                    </div>
                  )}

                  {(selectedOrder.orderStatus === 'accepted' || selectedOrder.orderStatus === 'confirmed') && (
                    <button
                      type="button"
                      onClick={() => handleAdvanceToProcessing(selectedOrder)}
                      className="w-full py-2.5 rounded-xl bg-[#7B1131] hover:bg-[#5e0c24] text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                    >
                      ➔ Start Processing
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'processing' && (
                    <button
                      type="button"
                      onClick={() => handleAdvanceToPacked(selectedOrder)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                    >
                      ➔ Mark as Packed
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'packed' && (
                    <button
                      type="button"
                      onClick={() => {
                        setShippingOrder(selectedOrder);
                        setTrackingId('');
                        setTrackingError(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                    >
                      ➔ Dispatch / Out for Delivery
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'shipped' && (
                    <button
                      type="button"
                      onClick={() => handleMarkDelivered(selectedOrder)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                    >
                      ➔ Mark Delivered
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'delivered' && (
                    <button
                      type="button"
                      onClick={() => handleMarkCompleted(selectedOrder)}
                      className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-2xs cursor-pointer transition-all"
                    >
                      🎉 Complete Order
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'completed' && (
                    <div className="w-full py-2 text-center rounded-xl bg-teal-50 border border-teal-200 text-teal-700 font-bold text-xs">
                      ✓ Order Fulfilled &amp; Completed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 text-center space-y-2 sticky top-6 shadow-2xs">
              <FileText className="w-10 h-10 text-neutral-300 mx-auto" />
              <h4 className="font-bold text-sm text-neutral-700">No Order Selected</h4>
              <p className="text-xs text-neutral-400">
                Click on any order card on the left to view receipt, customer details, and bill.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* MODAL 2: REJECT ORDER DIALOG                                            */}
      {/* ======================================================================= */}
      {rejectingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <XCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                Reject Order #{rejectingOrder.orderNumber}
              </h3>
              <p className="text-xs text-neutral-500">
                Please specify a reason. This will be recorded on the customer timeline and included in notification.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <label className="font-bold text-neutral-700 block">Select Reason:</label>
              {[
                'Handcrafted botanical formula currently in seasonal batch curing',
                'Delivery pincode currently unserviceable for herbal oils',
                'Customer requested cancellation before compounding',
                'Duplicate order entry detected',
              ].map((r) => (
                <label key={r} className="flex items-start space-x-2.5 cursor-pointer p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200">
                  <input
                    type="radio"
                    name="rejectReason"
                    checked={rejectReason === r}
                    onChange={() => setRejectReason(r)}
                    className="mt-0.5 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-neutral-700 font-medium leading-tight">{r}</span>
                </label>
              ))}

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Or Custom Reason:</label>
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-xs focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectingOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 3: DISPATCH / SHIP ORDER DIALOG                                   */}
      {/* ======================================================================= */}
      {shippingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 space-y-5 my-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
              <Truck className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-xl text-[#3a1d1d]">
                Dispatch Order #{shippingOrder.orderNumber}
              </h3>
              <p className="text-xs text-neutral-500">
                Choose or add a courier company and enter tracking details for customer notification.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Courier Company Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-neutral-800">
                    Courier Logistics Partner:
                  </label>

                  {!isAddingCourier ? (
                    <button
                      type="button"
                      onClick={() => setIsAddingCourier(true)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold transition-colors cursor-pointer border border-purple-200"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Add Courier Company</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCourier(false);
                        setNewCourierName('');
                      }}
                      className="text-[11px] font-bold text-neutral-500 hover:text-neutral-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* Inline Add Courier Form */}
                {isAddingCourier ? (
                  <div className="p-3.5 bg-purple-50/80 border-2 border-purple-300/80 rounded-2xl space-y-2.5 animate-fadeIn">
                    <div className="text-[11px] font-extrabold text-purple-950 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Enter New Courier Company</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        autoFocus
                        value={newCourierName}
                        onChange={(e) => setNewCourierName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCourier();
                          }
                        }}
                        placeholder="e.g. ST Courier, Trackon, Porter, Ekart..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-purple-300 font-semibold text-xs text-neutral-800 outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddCourier()}
                        disabled={!newCourierName.trim()}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        + Add &amp; Select
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <select
                      value={courierName}
                      onChange={(e) => {
                        if (e.target.value === '__add_new__') {
                          setIsAddingCourier(true);
                        } else {
                          setCourierName(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 font-bold text-xs text-neutral-800 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all cursor-pointer"
                    >
                      {courierList.map((c) => (
                        <option key={c} value={c}>
                          🚚 {c}
                        </option>
                      ))}
                      <option value="__add_new__" className="text-purple-700 font-extrabold">
                        ➕ + Add New Courier Company...
                      </option>
                    </select>
                  </div>
                )}
              </div>

              {/* Tracking / AWB Number Section (MANDATORY) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-neutral-800">
                    Tracking / AWB Number <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">
                    Mandatory
                  </span>
                </div>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    if (e.target.value.trim()) setTrackingError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleConfirmShipped();
                    }
                  }}
                  placeholder="Enter Tracking or AWB ID (e.g. ST-481920, BLU-98401928)..."
                  className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold outline-none transition-all ${
                    trackingError && !trackingId.trim()
                      ? 'border-2 border-rose-500 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                      : 'bg-neutral-50 border border-neutral-300 text-neutral-800 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  }`}
                />
                {trackingError && !trackingId.trim() && (
                  <p className="text-[11px] font-bold text-rose-600 animate-fadeIn">
                    ⚠️ Please enter Tracking / AWB Number to continue.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShippingOrder(null);
                  setIsAddingCourier(false);
                  setTrackingError(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmShipped}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all hover:shadow-md"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
