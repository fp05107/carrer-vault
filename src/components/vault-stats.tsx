"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface VaultStatsProps {
    total: number;
    interviewing: number;
    offers: number;
    rejected: number;
}

export function VaultStats({ total, interviewing, offers, rejected }: VaultStatsProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    const stats = [
        {
            title: "Total Applications",
            value: total,
            icon: Briefcase,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20"
        },
        {
            title: "Interviewing",
            value: interviewing,
            icon: Clock,
            color: "text-secondary",
            bg: "bg-secondary/10",
            border: "border-secondary/20"
        },
        {
            title: "Offers",
            value: offers,
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            title: "Rejected",
            value: rejected,
            icon: XCircle,
            color: "text-destructive",
            bg: "bg-destructive/10",
            border: "border-destructive/20"
        }
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {stats.map((stat, index) => (
                <motion.div key={index} variants={item}>
                    <Card className={`glass-card ${stat.border} hover:scale-105 transition-transform duration-300`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {index === 0 ? "All time" : "Current status"}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
