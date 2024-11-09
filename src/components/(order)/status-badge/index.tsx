type StatusType = "shipping" | "completed" | "pending" | "cancelled";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig = {
  shipping: {
    label: "Đang vận chuyển",
    className: "bg-blue-100 text-blue-400",
  },
  completed: {
    label: "Thành công",
    className: "bg-green-100 text-green-400",
  },
  pending: {
    label: "Chờ xác nhận",
    className: "bg-yellow-100 text-yellow-400",
  },
  cancelled: {
    label: "Đã hủy",
    className: "bg-red-100 text-red-400",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`rounded-[32px] px-6 py-1 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}
