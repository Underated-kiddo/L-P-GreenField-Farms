import RoleDashboardLayout from "../components/RoleDashboardLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function FarmerDashboard() {
  const [product, setProduct] = useState({ name: "", price: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product to post:", product);
    setProduct({ name: "", price: "", description: "" });
    alert("Product posted successfully!");
  };

  return (
    <RoleDashboardLayout role="farmer" active="dashboard">
      <div className="p-6 max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your products, view farming tips, and track stats.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardHeader><CardTitle>Products Listed</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">16</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Sales This Month</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">Ksh 5,400</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Tips Received</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">12</p></CardContent></Card>
        </div>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Post a Product</h2>
          <Input placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          <Input type="number" placeholder="Price (KES)" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          <Textarea placeholder="Short description" rows={4} value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <Button type="submit" className="w-fit bg-green-700">Submit Product</Button>
        </form>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-2">Farming Tips from Admin</h2>
          <ul className="text-sm text-muted-foreground mt-2 list-disc pl-6 space-y-1">
            <li>Water tomatoes early in the morning</li>
            <li>Use organic compost twice a month</li>
            <li>Harvest spinach weekly for optimal freshness</li>
          </ul>
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
