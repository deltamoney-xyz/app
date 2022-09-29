import { useMediaQuery } from "react-responsive";

const MobileUp = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 768 });
  return isMobile ? children : null;
};

const MobileDown = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export { MobileUp, MobileDown };
