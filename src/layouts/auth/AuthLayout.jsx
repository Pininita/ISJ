import VantaBackground from "@/components/ui/background/VantaBackground";

export const AuthLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
          <VantaBackground />
          <main className="relative z-10">{children}</main>
        </div>
      )
}