import { UserButton } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? ""
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress?.toLowerCase() ?? ""
  const adminEmails = getAdminEmails()

  if (!adminEmails.includes(userEmail)) {
    redirect("/")
  }

  return (
    <div className="min-h-screen">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Admin</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{userEmail}</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      {children}
    </div>
  )
}
