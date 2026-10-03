"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import Link from "next/link";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading orders...</div>;
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <Link href="/" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
      {orders.map((order) => (
        <div key={order.order_id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <div>
              <div className="font-bold text-lg">{order.order_id}</div>
              <div className="text-sm text-gray-500">{new Date(order.created_at * 1000).toLocaleString()}</div>
            </div>
            <div className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-lg uppercase text-sm tracking-wider text-center">
              {order.status.replace("_", " ")}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-900 text-lg">Total: Rs. {order.grand_total.toLocaleString()}</span>
            <Link href={`/orders/${order.order_id}`} className="text-blue-600 font-bold hover:underline">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
