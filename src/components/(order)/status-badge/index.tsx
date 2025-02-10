type StatusType = "unpaid" | "delivering" | "delivered" | "canceled";

interface StatusBadgeProps {
  status: StatusType;
}

const statusConfig = {
  delivering: {
    label: "Đang vận chuyển",
    className: "bg-blue-100 text-blue-400",
  },
  delivered: {
    label: "Thành công",
    className: "bg-green-100 text-green-400",
  },
  unpaid: {
    label: "Chờ xác nhận",
    className: "bg-yellow-100 text-orange-500",
  },
  canceled: {
    label: "Đã hủy",
    className: "bg-red-100 text-red-400",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return config ? (
    <span
      className={`rounded-[32px] px-6 py-1 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  ) : (
    "Không xác định"
  );
}
