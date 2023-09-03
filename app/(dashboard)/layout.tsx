// Layout need to have a html tag, so browser knows that it needs to render HTML
// Head tag is using the head from the head file defined in the root of the app dir

import GlassPane from "@/components/GlassPane";
import "@/styles/global.css";
import Sidebar from "@/components/Sidebar";
import Greetings from "@/components/greetings";

export default function DashboardRootLayour({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-g">
        <GlassPane className="w-full h-full flex items-center">
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
