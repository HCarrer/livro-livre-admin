import { LOGOUT } from "@/constants/routes";
import Button from "@/design-system/button";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <div className="mt-40">
      <Link href={LOGOUT}>
        <Button>Sign Out</Button>
      </Link>
    </div>
  );
};

export default ProfilePage;
