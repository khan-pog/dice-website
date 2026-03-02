import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Admin</span>
        <UserButton afterSignOutUrl="/" />
      </header>
      {children}
    </div>
  )
}
