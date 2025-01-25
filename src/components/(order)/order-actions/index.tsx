import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusType = "unpaid" | "delivering" | "delivered" | "canceled";

interface OrderActionsProps {
  status: StatusType;
  orderId: string;
  onRepurchase?: (orderId: string) => void;
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
