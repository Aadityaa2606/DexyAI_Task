import MessageSender from "./messageSender";
import Sidebar from "./sidebar";

export default function Home() {
  return (
    <div className="flex items-center">
      <Sidebar />
      <div className="w-full">
      <MessageSender />
      </div>
    </div>
  );
}
