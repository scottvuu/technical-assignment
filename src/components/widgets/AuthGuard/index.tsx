import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "store";
import { userSelector } from "store/selectors/user";

type Props = {
  children?: ReactElement;
};

export const AuthGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    if (user) {
      navigate("/post");
    }
  }, [user,navigate]);

  return <>{children}</>;
};
