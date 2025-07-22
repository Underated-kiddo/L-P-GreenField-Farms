import RoleDashboardLayout from "../components/RoleDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CustomerDashboard() {
  return (
    <RoleDashboardLayout role="customer" active="dashboard">
      <div className="p-6 max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Browse products, view exclusive deals, and manage your orders.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardHeader><CardTitle>Orders Made</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">17</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Hot Deals</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">3 Active</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Wishlist</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">5 Items</p></CardContent></Card>
        </div>

        <Separator />

        <h2 className="text-xl font-semibold mb-2">Hot Deals for You</h2>
        <ul className="text-sm text-muted-foreground mt-2 list-disc pl-6">
          <li>Buy 2kg onions, get 1kg free</li>
          <li>Free delivery on orders over Ksh 2,000</li>
          <li>10% off all tomatoes this week</li>
        </ul>

        <Separator />

        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <ul className="text-sm text-muted-foreground mt-2 list-disc pl-6">
          <li>Ordered 2kg potatoes from Farmer Kip</li>
          <li>Ordered 1 crate eggs from John</li>
          <li>Ordered 5kg bananas from Wanjiku</li>
        </ul>
      </div>
    </RoleDashboardLayout>
  );
}
