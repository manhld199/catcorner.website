import { DollarSign, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// import types
import { Order } from "@/types/order";

type StatusType = "unpaid" | "delivering" | "delivered" | "canceled";

interface OrderActionsProps {
  order: Order;
  onRepurchase?: (order: Order) => void;
  onCancel?: (orderId: string) => void;
  onReview?: (orderId: string) => void;
}
// Thêm interface cho button
interface ActionButton {
  label: string;
  icon?: React.ReactNode; // Làm cho icon là optional
  variant: "filled" | "filled_outlined";
  className: string;
  onClick: () => void;
}

const OrderActions = ({
  order,
  onRepurchase,
  onCancel,
  onReview,
}: OrderActionsProps) => {
  const router = useRouter();

  const handleRepurchase = () => {
    onRepurchase?.(order);
  };

  const handleCancel = () => {
    onCancel?.(order._id);
  };

  const handleReview = () => {
    onReview?.(order._id);
    // xử lý đánh giá ở đây
    router.push(`/rating?pid=${order.order_id_hashed}`);
  };

  const actionButtons: Record<StatusType, ActionButton[]> = {
    delivered: [
      {
        label: "Mua lại",
        icon: <RefreshCw size={30} strokeWidth={1.2} />,
        variant: "filled_outlined" as const,
        className:
          " tex-base font-medium px-14 text-text-btn-color border-pri-7",
        onClick: handleRepurchase,
      },
      {
        label: "Đánh giá",
        variant: "filled" as const,
        className: "bg-pri-7 text-base font-medium px-14",
        onClick: handleReview,
      },
    ],
    unpaid: [
      {
        label: "Thanh toán",
        icon: <DollarSign size={30} strokeWidth={1.2} />,
        variant: "filled" as const,
        className: "bg-pri-7 tex-base font-medium px-10",
        onClick: handleRepurchase,
      },
      {
        label: "Hủy đơn",
        variant: "filled_outlined" as const,
        className: "tex-base font-medium px-14 text-red-600 border-red-600",
        onClick: handleCancel,
      },
    ],
    canceled: [
      {
        label: "Mua lại",
        icon: <RefreshCw size={30} strokeWidth={1.2} />,
        variant: "filled" as const,
        className: "bg-pri-7 tex-base font-medium px-14",
        onClick: handleRepurchase,
      },
    ],
    delivering: [], // Không có action
  };

  const buttons = actionButtons[order.order_status];

  return (
    <div className="flex gap-4 justify-end">
      {buttons && buttons.length > 0
        ? buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              className={button.className}
              onClick={button.onClick}>
              {button.icon}
              {button.label}
            </Button>
          ))
        : null}
    </div>
  );
};

export default OrderActions;
