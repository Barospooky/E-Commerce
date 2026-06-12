import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Package, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  type AdminOrderStatus,
  fetchAdminOrder,
  updateAdminOrderStatus
} from "../api/orders";
import { useAdminSessionStore } from "../store/adminSessionStore";

const statusOptions: AdminOrderStatus[] = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

function formatStatus(status: AdminOrderStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function statusClassName(status: AdminOrderStatus) {
  const map: Record<AdminOrderStatus, string> = {
    PENDING: "bg-[#fff1df] text-[#ff7b47]",
    PROCESSING: "bg-[#dff0ff] text-[#2c7be5]",
    SHIPPED: "bg-[#edf8d8] text-[#7b9d42]",
    DELIVERED: "bg-[#e5f7e8] text-[#0e8a66]",
    CANCELLED: "bg-[#fde4e4] text-[#ef4444]"
  };

  return map[status];
}

export default function AdminOrderDetailsPage() {
  const token = useAdminSessionStore((state) => state.accessToken);
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const queryClient = useQueryClient();

  const orderQuery = useQuery({
    queryKey: ["admin-order", orderId],
    queryFn: () => fetchAdminOrder(token ?? "", orderId ?? ""),
    enabled: Boolean(token && orderId)
  });

  const order = orderQuery.data?.data;
  const [selectedStatus, setSelectedStatus] = useState<AdminOrderStatus | "">("");

  const currentStatus = useMemo(
    () => selectedStatus || order?.status || "PENDING",
    [order?.status, selectedStatus]
  );

  const updateStatusMutation = useMutation({
    mutationFn: (status: AdminOrderStatus) => updateAdminOrderStatus(token ?? "", orderId ?? "", status),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-order", orderId] });
      setSelectedStatus(response.data.status);
    }
  });

  if (!orderId) {
    return (
      <section className="rounded-[20px] bg-white px-5 py-6 text-soil shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <p className="text-sm text-soil/70">Order ID is missing from the URL.</p>
      </section>
    );
  }

  if (orderQuery.isLoading) {
    return (
      <section className="rounded-[20px] bg-white px-5 py-6 text-soil shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <p className="text-sm text-soil/70">Loading order details...</p>
      </section>
    );
  }

  if (orderQuery.isError || !order) {
    return (
      <section className="rounded-[20px] bg-white px-5 py-6 text-soil shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <p className="text-sm text-[#c2410c]">
          {orderQuery.error instanceof Error ? orderQuery.error.message : "Unable to load this order."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/admin/orders")}
          className="mt-4 rounded-[12px] border border-soil/10 px-4 py-2 text-sm"
        >
          Back to orders
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-4 text-soil">
      <section className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link to="/admin/orders" className="inline-flex items-center gap-2 text-sm text-soil/65 hover:text-soil">
              <ArrowLeft className="h-4 w-4" />
              Back to orders
            </Link>
            <h1 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.04em] text-soil">
              Order #{order.id}
            </h1>
            <p className="mt-1 text-sm text-soil/70">
              Placed on {order.date} by {order.customer}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(order.status)}`}>
              {formatStatus(order.status)}
            </span>
            <select
              value={currentStatus}
              onChange={(event) => setSelectedStatus(event.target.value as AdminOrderStatus)}
              className="rounded-[12px] border border-soil/10 bg-white px-4 py-2 text-sm outline-none"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={updateStatusMutation.isPending || currentStatus === order.status}
              onClick={() => updateStatusMutation.mutate(currentStatus)}
              className="rounded-[12px] bg-[#0e8a66] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateStatusMutation.isPending ? "Saving..." : "Update status"}
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          <article className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#0e8a66]" />
              <h2 className="text-lg font-semibold">Items</h2>
            </div>

            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={`${item.productName}-${item.quantity}`}
                  className="flex items-start justify-between rounded-[16px] border border-soil/8 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-soil">{item.productName}</p>
                    <p className="mt-1 text-sm text-soil/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-soil">Rs. {item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#ff7b47]" />
              <h2 className="text-lg font-semibold">Shipping address</h2>
            </div>
            <div className="mt-4 rounded-[16px] border border-soil/8 px-4 py-4 text-sm text-soil/75">
              {order.shippingAddress.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </article>
        </div>

        <div className="space-y-4">
          <article className="rounded-[20px] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(48,37,29,0.06)]">
            <div className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-[#0e8a66]" />
              <h2 className="text-lg font-semibold">Summary</h2>
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-soil/60">Customer</dt>
                <dd className="font-medium text-soil">{order.customer}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-soil/60">Email</dt>
                <dd className="font-medium text-soil">{order.email}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-soil/60">Payment</dt>
                <dd className="font-medium text-soil">{order.payment}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-soil/60">Items</dt>
                <dd className="font-medium text-soil">{order.items.length}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-soil/8 pt-3">
                <dt className="text-soil/60">Total</dt>
                <dd className="text-base font-semibold text-soil">Rs. {order.amount.toFixed(2)}</dd>
              </div>
            </dl>

            {updateStatusMutation.isError ? (
              <p className="mt-4 text-sm text-[#c2410c]">
                {updateStatusMutation.error instanceof Error ? updateStatusMutation.error.message : "Could not update status."}
              </p>
            ) : null}
          </article>
        </div>
      </section>
    </div>
  );
}
