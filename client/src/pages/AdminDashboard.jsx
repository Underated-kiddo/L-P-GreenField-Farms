import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const [tip, setTip] = useState({ title: "", content: "", media: [] });
  const [ad, setAd] = useState({ productRef: "", description: "", media: [] });

  const handleTipSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/tip", tip, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      alert("Farming Tip Posted Successfully");
      setTip({ title: "", content: "", media: [] });
    } catch (err) {
      alert("Failed to post tip");
    }
  };

  const handleAdSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/advert", ad, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      alert("Advert Posted Successfully");
      setAd({ productRef: "", description: "", media: [] });
    } catch (err) {
      alert("Failed to post advert");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage farming tips, product ads, and user activity</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,204</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tips Posted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">87</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ads Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">42</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Post Farming Tip */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Post Farming Tip</h2>
        <form onSubmit={handleTipSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={tip.title}
            onChange={(e) => setTip({ ...tip, title: e.target.value })}
          />
          <Textarea
            placeholder="Tip content"
            rows={5}
            value={tip.content}
            onChange={(e) => setTip({ ...tip, content: e.target.value })}
          />
          {/* Optional media upload here */}
          <Button type="submit" className="w-fit bg-green-600">
            Post Tip
          </Button>
        </form>
      </div>

      <Separator />

      {/* Post Product Advert */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Post Product Advert</h2>
        <form onSubmit={handleAdSubmit} className="space-y-4">
          <Input
            placeholder="Product Reference"
            value={ad.productRef}
            onChange={(e) => setAd({ ...ad, productRef: e.target.value })}
          />
          <Textarea
            placeholder="Advert description"
            rows={5}
            value={ad.description}
            onChange={(e) => setAd({ ...ad, description: e.target.value })}
          />
          {/* Optional media upload here */}
          <Button type="submit" className="w-fit bg-blue-600">
            Post Advert
          </Button>
        </form>
      </div>

      <Separator />

      {/* User Activity Logs (Placeholder for now) */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <p className="text-gray-500 dark:text-gray-400">This section will show logs of farmer and customer actions.</p>
        {/* Could later map actual logs here */}
        <ul className="text-sm text-muted-foreground mt-2 list-disc pl-6">
          <li>Farmer John posted a new product</li>
          <li>Customer Jane bought 5 tomatoes</li>
          <li>Admin Brad posted a farming tip</li>
        </ul>
      </div>
    </div>
  );
}
