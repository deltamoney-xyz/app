import { notification } from "components/common/Antd";

export const useNotification = () => {
  const openNotification = (description) => {
    notification.open({
      message: "Transaction Success",
      description,
      placement: "bottomLeft",
    });
  };

  return {
    openNotification,
  };
};
