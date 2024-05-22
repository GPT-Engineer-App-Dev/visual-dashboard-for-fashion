import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table.jsx";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("");

  const mockData = [
    { item: "T-Shirt", sku: "TS123", quantity: 100, location: "Warehouse A", lastUpdated: "2023-10-01" },
    { item: "Jeans", sku: "JN456", quantity: 50, location: "Warehouse B", lastUpdated: "2023-10-02" },
    { item: "Jacket", sku: "JK789", quantity: 20, location: "Warehouse A", lastUpdated: "2023-10-03" },
    { item: "Sneakers", sku: "SN012", quantity: 75, location: "Warehouse C", lastUpdated: "2023-10-04" },
  ];

  const filteredData = mockData.filter((item) => item.item.toLowerCase().includes(filter.toLowerCase()) || item.sku.toLowerCase().includes(filter.toLowerCase()) || item.location.toLowerCase().includes(filter.toLowerCase()));

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + ["Item,SKU,Quantity,Location,Last Updated"].concat(filteredData.map((item) => `${item.item},${item.sku},${item.quantity},${item.location},${item.lastUpdated}`)).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items by Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Items by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Locations</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reorder Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Alerts</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mb-4">
        <input type="text" placeholder="Filter..." className="border rounded-md p-2" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <Button onClick={exportData}>Export</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;
