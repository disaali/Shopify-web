"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Delivery Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lahore");

  useEffect(() => {
    if (!user) return;
    const loadDraft = async () => {
      try {
        const res = await api.get("/checkout");
        setDraft(res.data);
      } catch (err: any) {
        if (err.response?.status === 400) router.push("/cart");
      } finally {
        setLoading(false);
      }
    };
    loadDraft();
  }, [user, router]);

  const submitDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/checkout/delivery", { name, phone, address, city });
      setDraft(res.data);
      setStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  const submitShipping = async (method: string) => {
    try {
      const res = await api.post("/checkout/shipping", { method });
      setDraft(res.data);
      setStep(3);
    } catch (err) {
      console.error(err);
    }
  };

  const submitPayment = async (method: string) => {
    try {
      const res = await api.post("/checkout/payment", { method });
      setDraft(res.data);
      setStep(4);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmOrder = async () => {
    try {
      const res = await api.post("/checkout/confirm");
      router.push(`/orders/${res.data.order.order_id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-20">Loading checkout...</div>;
  if (!draft) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      
      <div className="flex justify-between border-b border-gray-200 pb-4 mb-8">
        <div className={`font-bold ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>1. Delivery</div>
        <div className={`font-bold ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>2. Shipping</div>
        <div className={`font-bold ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>3. Payment</div>
        <div className={`font-bold ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>4. Review</div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        {step === 1 && (
          <form onSubmit={submitDelivery} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input required className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input required className="w-full border p-2 rounded" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03XXXXXXXXX" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea required className="w-full border p-2 rounded" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select className="w-full border p-2 rounded" value={city} onChange={e => setCity(e.target.value)}>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700">Continue to Shipping</button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
            <button onClick={() => submitShipping("standard")} className="w-full border p-4 rounded-xl flex justify-between items-center hover:border-blue-500 hover:bg-blue-50">
              <span className="font-bold">Standard Shipping</span>
              <span className="text-gray-500 text-sm">(Usually takes 3-5 days)</span>
            </button>
            <button onClick={() => submitShipping("express")} className="w-full border p-4 rounded-xl flex justify-between items-center hover:border-blue-500 hover:bg-blue-50">
              <span className="font-bold">Express Shipping</span>
              <span className="text-gray-500 text-sm">(Next day delivery)</span>
            </button>
            <button onClick={() => setStep(1)} className="text-gray-500 text-sm mt-4 underline">Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <button onClick={() => submitPayment("cash_on_delivery")} className="w-full border p-4 rounded-xl flex justify-between items-center hover:border-blue-500 hover:bg-blue-50">
              <span className="font-bold">Cash on Delivery (COD)</span>
            </button>
            <button disabled className="w-full border p-4 rounded-xl flex justify-between items-center opacity-50 cursor-not-allowed">
              <span className="font-bold">Credit/Debit Card</span>
              <span className="text-xs text-red-500">Currently Disabled</span>
            </button>
            <button onClick={() => setStep(2)} className="text-gray-500 text-sm mt-4 underline">Back</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Review Order</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              {draft.items.map((item: any) => (
                <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-right">
              <div>Subtotal: Rs. {draft.subtotal.toLocaleString()}</div>
              <div>Shipping Fee: Rs. {draft.shipping_fee.toLocaleString()}</div>
              <div className="text-2xl font-black text-blue-600 pt-2">Total: Rs. {draft.grand_total.toLocaleString()}</div>
            </div>
            <button onClick={confirmOrder} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 text-lg shadow-lg">Confirm Order</button>
            <button onClick={() => setStep(3)} className="text-gray-500 text-sm mt-4 underline w-full text-center">Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
