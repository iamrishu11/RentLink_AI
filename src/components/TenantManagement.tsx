import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import TenantCard from "./ui/tenant-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface TenantManagementProps {
  className?: string;
}

interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  paymentStatus: "paid" | "pending" | "overdue";
  score: number;
  rentAmount: string;
}

const TenantManagement = ({ className }: TenantManagementProps) => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    rentAmount: "",
  });

  useEffect(() => {
    fetchTenants();
  }, []);

  //  Fetch tenants from backend
  const fetchTenants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tenants"); // Update API URL if needed
      setTenants(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tenants:", error);
      setLoading(false);
    }
  };

  //  Add new tenant via API
  const handleAddTenant = async () => {
    if (!newTenant.name || !newTenant.email || !newTenant.property || !newTenant.rentAmount) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/tenants", {
        name: newTenant.name,
        email: newTenant.email,
        phone: newTenant.phone || "-",
        property: newTenant.property,
        paymentStatus: "pending",
        score: 80, // Default score
        rentAmount: `$${newTenant.rentAmount}/mo`,
      });

      // Add new tenant to state
      setTenants([...tenants, response.data]);

      // Reset form and close dialog
      setNewTenant({
        name: "",
        email: "",
        phone: "",
        property: "",
        rentAmount: "",
      });
      setIsAddDialogOpen(false);

      toast({
        title: "Tenant added",
        description: `${response.data.name} has been added successfully`,
      });
    } catch (error) {
      console.error("Error adding tenant:", error);
      toast({
        title: "Error",
        description: "Could not add tenant. Try again.",
        variant: "destructive",
      });
    }
  };

  // Filter tenants based on search term
  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">Tenants</h2>
        <div className="flex w-full sm:w-auto space-x-2">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants..."
              className="pl-9 w-full sm:w-[260px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading tenants...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTenants.map((tenant) => (
            <TenantCard
              key={tenant._id}
              name={tenant.name}
              email={tenant.email}
              phone={tenant.phone}
              property={tenant.property}
              paymentStatus={tenant.paymentStatus}
              score={tenant.score}
              rentAmount={tenant.rentAmount}
            />
          ))}
        </div>
      )}

      {/* Add Tenant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Enter the tenant details below to add them to your system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newTenant.name}
                onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={newTenant.email}
                onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                placeholder="johndoe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input 
                id="phone"
                value={newTenant.phone}
                onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property">Property</Label>
              <Input 
                id="property"
                value={newTenant.property}
                onChange={(e) => setNewTenant({ ...newTenant, property: e.target.value })}
                placeholder="Sunset Apartments #302"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rentAmount">Monthly Rent Amount ($)</Label>
              <Input 
                id="rentAmount"
                value={newTenant.rentAmount}
                onChange={(e) => setNewTenant({ ...newTenant, rentAmount: e.target.value })}
                placeholder="1200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTenant}>Add Tenant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantManagement;
