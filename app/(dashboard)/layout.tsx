// Layout need to have a html tag, so browser knows that it needs to render HTML
// Head tag is using the head from the head file defined in the root of the app dir

import GlassPane from "@/components/GlassPane";
import "@/styles/global.css";
import Sidebar from "@/components/Sidebar";

export default function DashboardRootLayour({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen rainbow-mesh p-g">
        <GlassPane className="w-full h-full flex items-center">
          <Sidebar />
          {children}
        </GlassPane>
        {/* This is needed to the modal defined in New Project knows where to render */}
        <div id="modal"></div>
      </body>
    </html>
  );
}
