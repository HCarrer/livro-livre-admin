"use client";

import { auth } from "+/authentication/firebase";
import Skeleton from "@/components/common/Skeleton";
import { BOOLEAN_QUERY, LOGIN } from "@/constants/routes";
import axios from "axios";
import { signOut } from "firebase/auth";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();

  signOut(auth)
    .then(async () => {
      await axios.post("/api/clear-auth").then(() => {
        router.push(`${LOGIN}?desconectado=${BOOLEAN_QUERY.TRUE}`);
      });
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });

  return (
    <Skeleton position="top">
      <div className="h-screen w-full flex justify-center items-center">
        <LoaderIcon className="animate-spin text-navy-blue" size={48} />
      </div>
    </Skeleton>
  );
};

export default ProfilePage;
