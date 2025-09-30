"use client";

import Skeleton from "@/components/common/Skeleton";
import Toast from "@/components/common/Toast";
import { LOGOUT_TOAST_DICT } from "@/constants/forms/logout";
import { BOOLEAN_QUERY, LOGIN } from "@/constants/routes";
import { logout } from "@/services/authentication";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [formError, setFormError] = useState<
    keyof typeof LOGOUT_TOAST_DICT | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    handleLogout();
  }, [router]);

  const handleLogout = async () => {
    const { success, toastId } = await logout();
    if (success) {
      return router.push(`${LOGIN}?desconectado=${BOOLEAN_QUERY.TRUE}`);
    } else {
      setFormError(toastId);
    }
  };

  return (
    <Skeleton position="top">
      {formError ? (
        <Toast
          type={LOGOUT_TOAST_DICT[formError].type}
          content={LOGOUT_TOAST_DICT[formError].content}
        />
      ) : null}
      <div className="h-screen w-full flex justify-center items-center">
        <LoaderIcon className="animate-spin text-navy-blue" size={48} />
      </div>
    </Skeleton>
  );
};

export default ProfilePage;
