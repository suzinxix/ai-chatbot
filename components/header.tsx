import Image from "next/image";
import { memo } from "react";
import { notoSans } from "@/app/font";
import clsx from "clsx";

export const Header = memo(function Header() {
  return (
    <div className="sticky flex gap-2 p-4">
      <Image src={"/logo.png"} width={32} height={32} alt="logo" />
      <div className={clsx(notoSans.className)}>Nulla</div>
    </div>
  );
});
