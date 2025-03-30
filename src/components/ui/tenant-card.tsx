
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCircle, Phone, Mail, Home, ChevronRight } from "lucide-react";

interface TenantCardProps {
  name: string;
  email: string;
  phone: string;
  property: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  score: number;
  rentAmount: string;
}

const TenantCard = ({
  name,
  email,
  phone,
  property,
  paymentStatus,
  score,
  rentAmount
}: TenantCardProps) => {
  const statusColors = {
    paid: 'bg-green-100 text-green-800 hover:bg-green-200',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    overdue: 'bg-red-100 text-red-800 hover:bg-red-200'
  };

  const statusText = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue'
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-brand-lightBlue p-2">
              <UserCircle className="h-6 w-6 text-brand-blue" />
            </div>
            <div className="ml-3">
              <CardTitle className="text-lg font-semibold">{name}</CardTitle>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Home className="h-3 w-3 mr-1" />
                {property}
              </div>
            </div>
          </div>
          <Badge className={statusColors[paymentStatus]}>
            {statusText[paymentStatus]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm">
            <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
            {email}
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
            {phone}
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Rent Amount</div>
            <div className="font-bold">{rentAmount}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Tenant Score</div>
            <div className="font-bold">{score}/100</div>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantCard;
