"use client";
import { useEffect, useState, use } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = use(params);

  useEffect(() => {
    if (!user) return;
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [user, id]);

  if (loading) return <div className="text-center py-20">Loading order...</div>;
  if (!order) return <div className="text-center py-20">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Order {order.order_id}</h1>
        <div className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg uppercase tracking-wider">
          {order.status.replace("_", " ")}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl flex gap-3 text-sm font-medium">
        <InfoIcon className="w-5 h-5 flex-shrink-0" />
        <p>*(This is a local development confirmation — no live PriceOye action was taken.)*</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.quantity} x Rs. {item.price.toLocaleString()}</div>
                </div>
                <div className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-right">
            <div>Subtotal: Rs. {order.subtotal.toLocaleString()}</div>
            <div>Shipping: Rs. {order.shipping_fee.toLocaleString()}</div>
            <div className="text-xl font-bold text-blue-600">Grand Total: Rs. {order.grand_total.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-2">Delivery Information</h2>
            <div className="text-gray-600">
              <p>{order.delivery_info?.name}</p>
              <p>{order.delivery_info?.phone}</p>
              <p>{order.delivery_info?.address}</p>
              <p>{order.delivery_info?.city}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-bold mb-2">Payment</h2>
            <div className="text-gray-600">
              <p>Method: <span className="uppercase">{order.payment_method?.replace("_", " ")}</span></p>
              <p>Status: <span className="uppercase">{order.payment_status?.replace("_", " ")}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
