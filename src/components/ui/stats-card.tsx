
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className
}: StatsCardProps) => {
  const trendColor = trend === 'up' 
    ? 'text-green-600' 
    : trend === 'down' 
      ? 'text-red-600' 
      : 'text-muted-foreground';

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend && trendValue && (
            <span className={cn("text-sm mr-2", trendColor)}>
              {trendValue}
            </span>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
