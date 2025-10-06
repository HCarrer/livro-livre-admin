"use client";

import Skeleton from "@/components/common/Skeleton";
import { LOGOUT_TOAST_DICT } from "@/constants/forms/logout";
import { BOOLEAN_QUERY, LOGIN } from "@/constants/routes";
import { useToast } from "@/contexts/toast";
import { logout } from "@/services/authentication";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProfilePage = () => {
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    handleLogout();
  }, [router]);

  const handleLogout = async () => {
    const { success, toastId } = await logout();
    if (success) {
      return router.push(`${LOGIN}?desconectado=${BOOLEAN_QUERY.TRUE}`);
    } else {
      showToast(
        LOGOUT_TOAST_DICT[toastId].content,
        LOGOUT_TOAST_DICT[toastId].type,
        LOGOUT_TOAST_DICT[toastId].duration,
      );
    }
  };

  return (
    <Skeleton position="top">
      <div className="h-screen w-full flex justify-center items-center">
        <LoaderIcon className="animate-spin text-navy-blue" size={48} />
      </div>
    </Skeleton>
  );
};

export default ProfilePage;
