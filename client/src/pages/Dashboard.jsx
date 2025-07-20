import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [greeting, setGreeting] = useState("")
  const [displayName, setDisplayName] = useState("User")
  const navigate = useNavigate()

  useEffect(() => {
    // Set dynamic greeting
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const nameFromStorage = localStorage.getItem("name")

    if (!token) {
      console.warn("No token found, redirecting to login.")
      return navigate("/login")
    }
    if (role === "admin") {
      console.info("Admin role detected, redirecting to admin dashboard.")
      return navigate("/admin")
    }

    axios.get(`${import.meta.env.VITE_API_URL}/user/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setData(res.data)
      const fetchedName = res.data?.user?.username || res.data?.user?.name
      setDisplayName(fetchedName || nameFromStorage || "User")
    })
    .catch((err) => {
      console.error("Dashboard API error:", err?.response || err?.message || err)
      alert("Dashboard error: " + (err?.response?.data?.message || err?.message || "Unknown error"))
      navigate("/login")
    })
  }, [navigate])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Sidebar role={localStorage.getItem("role") || "customer"} />
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-end w-full px-4 py-4 md:px-8 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full shadow hover:scale-105 transition-transform duration-200">
                <div className="relative">
                  <Avatar className="size-10">
                    <AvatarImage src={data?.user?.avatarUrl} alt={displayName} />
                    <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {data?.notifications?.unread > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold shadow ring-2 ring-white dark:ring-gray-900 animate-pulse">
                      {data.notifications.unread > 9 ? '9+' : data.notifications.unread}
                    </span>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2 min-w-[180px] shadow-xl rounded-xl">
              <DropdownMenuItem
                className="rounded-md hover:bg-muted transition-colors"
                onSelect={() => navigate('/settings')}
              >
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="rounded-md hover:bg-muted transition-colors text-destructive"
                onSelect={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('role')
                  navigate('/login')
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dashboard content */}
        <div className="flex-1 flex flex-col gap-8 p-4 md:p-8">
          {data ? (
            <>
              <div className="mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span className="text-3xl md:text-4xl">👋</span>
                  {greeting}, {displayName}!
                  <Badge className="ml-2 capitalize">{data.role}</Badge>
                </h1>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-2 scroll-snap-x scroll-snap-mandatory -mx-2 px-2">
                <Card className="min-w-[280px] max-w-xs flex-1 hover:scale-[1.02] transition-transform duration-200 scroll-snap-align-start">
                  <CardContent className="flex flex-col items-center gap-2">
                    <CardTitle className="text-lg">Your Stats</CardTitle>
                    <CardDescription className="text-4xl font-bold text-primary-600 dark:text-primary-400">{data.stats?.orders ?? 0}</CardDescription>
                    <span className="text-muted-foreground">Orders</span>
                  </CardContent>
                </Card>

                <Card className="min-w-[280px] max-w-xs flex-1 hover:scale-[1.02] transition-transform duration-200 scroll-snap-align-start">
                  <CardContent className="flex flex-col items-center gap-2">
                    <CardTitle className="text-lg">Alerts</CardTitle>
                    <CardDescription className="text-yellow-600 dark:text-yellow-400 font-semibold">No new alerts</CardDescription>
                  </CardContent>
                </Card>

                <Card className="min-w-[280px] max-w-xs flex-1 hover:scale-[1.02] transition-transform duration-200 scroll-snap-align-start">
                  <CardContent className="flex flex-col items-center gap-2">
                    <CardTitle className="text-lg">Tip from Admin</CardTitle>
                    <CardDescription className="text-green-700 dark:text-green-400 font-medium">Stay hydrated and check your crops daily!</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-96">
              <svg className="animate-spin h-8 w-8 text-primary-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Loading...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
