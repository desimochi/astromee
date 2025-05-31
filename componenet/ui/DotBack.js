import { cn } from "@/lib/utils"
export default function DotBack({children}){

    return(
         <div className="relative flex flex-col w-full items-center bg-yellow-50 dark:bg-black">
                      <div
                        className={cn(
                          "absolute inset-0",
                          "[background-size:20px_20px]",
                          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                        )}
                      />


                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
   
   {children}
   </div>
    )
}