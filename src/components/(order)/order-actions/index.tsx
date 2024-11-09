import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusType = "shipping" | "completed" | "pending" | "cancelled";

interface OrderActionsProps {
  status: StatusType;
  orderId: string;
  onRepurchase?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
  onReview?: (orderId: string) => void;
}

const OrderActions = ({
  status,
  orderId,
  onRepurchase,
  onCancel,
  onReview,
}: OrderActionsProps) => {
  const handleRepurchase = () => {
    onRepurchase?.(orderId);
  };

  const handleCancel = () => {
    onCancel?.(orderId);
  };

  const handleReview = () => {
    onReview?.(orderId);
  };

  const actionButtons = {
    completed: [
      {
        label: "Mua lại",
        icon: <RefreshCw size={30} strokeWidth={1.2} />,
        variant: "filled" as const,
        className: "bg-pri-7 tex-base font-medium px-14",
        onClick: handleRepurchase,
      },
      {
        label: "Đánh giá",
        variant: "filled_outlined" as const,
        className:
          "tex-base font-medium px-14 text-text-btn-color border-pri-7",
        onClick: handleReview,
      },
    ],
    pending: [
      {
        label: "Hủy đơn",
        variant: "filled_outlined" as const,
        className: "tex-base font-medium px-14 text-red-600 border-red-600",
        onClick: handleCancel,
      },
    ],
    cancelled: [
      {
        label: "Mua lại",
        icon: <RefreshCw size={30} strokeWidth={1.2} />,
        variant: "filled" as const,
        className: "bg-pri-7 tex-base font-medium px-14",
        onClick: handleRepurchase,
      },
    ],
    shipping: [], // Không có action
  };

  const buttons = actionButtons[status];

  return (
    <div className="flex gap-4 justify-end">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant}
          className={button.className}
          onClick={button.onClick}>
          {button.icon}
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default OrderActions;
