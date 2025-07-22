import RoleDashboardLayout from "../components/RoleDashboardLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const [product, setProduct] = useState({ name: "", description: "", price: "", media: [] });

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    alert("Product posted (placeholder logic)");
    setProduct({ name: "", description: "", price: "", media: [] });
  };

  return (
    <RoleDashboardLayout role="admin" active="admin">
      <div className="p-6 max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage products and users across the platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle>Total Products</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">120</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Total Sales</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">Ksh 124,000</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>New Farmers</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">5 this week</p></CardContent>
          </Card>
        </div>

        <Separator />

        <form onSubmit={handleProductSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Post New Product</h2>
          <Input placeholder="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          <Textarea placeholder="Description" rows={4} value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <Input type="number" placeholder="Price (Ksh)" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          <Button type="submit" className="w-fit bg-green-700">Post Product</Button>
        </form>
      </div>
    </RoleDashboardLayout>
  );
}