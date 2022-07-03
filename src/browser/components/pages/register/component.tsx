import * as React from "react";
import { RegisterUserForm } from "./register-user-form";

export const RegisterPage: React.FC = () => {
  return (
    <div className="site--register">
      <RegisterUserForm />
    </div>
  );
};
