import { useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import PageLoader from "../PageLoader";

const PaymentHistory = () => {
  const { user, darkMode } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <PageLoader />;

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <CreditCard size={60} className="text-zinc-400 mb-3" />
        <h2 className="text-xl font-black uppercase tracking-tight">
          No Payments Found
        </h2>
        <p className="text-zinc-500 text-sm">
          Completed transactions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-[2.5rem] p-8 transition-all ${
        darkMode
          ? "bg-zinc-900/40 border border-white/5 shadow-2xl"
          : "bg-white border border-slate-200 shadow-xl"
      }`}
    >
      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">
        Payment <span className="text-yellow-500">History</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead
            className={`text-[10px] uppercase tracking-widest font-black ${
              darkMode ? "text-zinc-400" : "text-slate-500"
            }`}
          >
            <tr>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Transaction</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {payments.map((pay) => (
              <tr
                key={pay._id}
                className="hover:bg-yellow-500/[0.03] transition"
              >
                <td className="px-6 py-5 font-black italic uppercase">
                  {pay.name}
                </td>
                <td className="px-6 py-5 font-black text-yellow-500">
                  ${pay.amount}
                </td>
                <td className="px-6 py-5 text-xs text-zinc-500 truncate max-w-[180px]">
                  {pay.transactionId}
                </td>
                <td className="px-6 py-5 text-sm">
                  {new Date(pay.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    PAID
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
