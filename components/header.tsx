import Image from "next/image";

export default function Header() {
  return (
    <div className="sticky flex gap-2 p-4">
      <Image src={"/logo.png"} width={32} height={32} alt="logo" />
      <div>AI Agent</div>
    </div>
  );
}
