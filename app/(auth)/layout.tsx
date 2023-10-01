// Layout needs to have a html tag, so browser knows that it needs to render HTML
// Head tag is using the head from the head file defined in the root of the app dir

import GlassPane from "@/components/GlassPane";
import "@/styles/global.css"


export default function AuthRootLayour({children}){
    return (
    <html lang="en">
        <head /> 
        <body className="h-screen w-screen rainbow-mesh p-g">
            <GlassPane className="w-full h-full flex items-center justify-center">
            {children}
            </GlassPane>
        </body>

    </html>
    )
}