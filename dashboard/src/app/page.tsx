"use client";

import Link from "next/link";
import {
  Train, MapPin, Bell, AlertTriangle, Camera, Bot,
  ArrowRight, Activity, Clock, Shield,
} from "lucide-react";
import { trains, stations, alerts, riskZones } from "@/lib/mockData";

const stats = [
  {
    label: "Active Trains",
    value: trains.length,
    icon: Train,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    label: "Stations",
    value: stations.length,
    icon: MapPin,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    label: "Active Alerts",
    value: alerts.length,
    icon: Bell,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    label: "Risk Zones",
    value: riskZones.length,
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
];

const features = [
  {
    href: "/dashboard",
    title: "Command Center",
    desc: "Full operational dashboard with live map, CCTV, alerts, and AI assistant",
    icon: Activity,
    color: "text-blue-400",
    border: "border-blue-500/30 hover:border-blue-500",
  },
  {
    href: "/map",
    title: "Live Network Map",
    desc: "Real-time train positions, station crowd density, and risk zone visualization",
    icon: MapPin,
    color: "text-green-400",
    border: "border-green-500/30 hover:border-green-500",
  },
  {
    href: "/alerts",
    title: "Alerts & Incidents",
    desc: "Active alerts, incident reports, and emergency recommendations",
    icon: Bell,
    color: "text-red-400",
    border: "border-red-500/30 hover:border-red-500",
  },
  {
    href: "/cctv",
    title: "CCTV Surveillance",
    desc: "Live camera feeds from stations and tracks across the network",
    icon: Camera,
    color: "text-purple-400",
    border: "border-purple-500/30 hover:border-purple-500",
  },
  {
    href: "/assistant",
    title: "AI Assistant",
    desc: "Ask about delays, risks, emergencies, and get instant recommendations",
    icon: Bot,
    color: "text-cyan-400",
    border: "border-cyan-500/30 hover:border-cyan-500",
  },
];

export default function Home() {
  const delayed = trains.filter((t) => t.status !== "on_time").length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">RailMind</h1>
            <p className="text-slate-400 text-sm mt-1">
              AI-Powered Railway Safety, Monitoring & Decision Intelligence Platform
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono text-slate-300">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${s.bg} ${s.border} border rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</span>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              </div>
            );
          })}
        </div>

        {/* Quick status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 lg:col-span-2">
            <h2 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              System Status
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">On-time trains</span>
                <p className="text-green-400 font-semibold text-lg">{trains.length - delayed}/{trains.length}</p>
              </div>
              <div>
                <span className="text-slate-500">Delayed / Critical</span>
                <p className="text-yellow-400 font-semibold text-lg">{delayed}</p>
              </div>
              <div>
                <span className="text-slate-500">Critical alerts</span>
                <p className="text-red-400 font-semibold text-lg">{alerts.filter((a) => a.severity === "critical").length}</p>
              </div>
              <div>
                <span className="text-slate-500">High-risk zones</span>
                <p className="text-orange-400 font-semibold text-lg">{riskZones.filter((z) => z.risk_category === "critical" || z.risk_category === "high").length}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h2 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Latest Alerts
            </h2>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-start gap-2 text-xs">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                    a.severity === "critical" ? "bg-red-500" : a.severity === "high" ? "bg-orange-500" : "bg-yellow-500"
                  }`} />
                  <div>
                    <p className="text-slate-300">{a.label}</p>
                    <p className="text-slate-500">{a.location}</p>
                  </div>
                </div>
              ))}
              <Link href="/alerts" className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 pt-1">
                View all alerts <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-white text-sm font-semibold mb-3">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.href}
                  href={f.href}
                  className={`bg-slate-900 border ${f.border} rounded-xl p-5 transition hover:bg-slate-800/80 group`}
                >
                  <Icon className={`w-6 h-6 ${f.color} mb-3`} />
                  <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  <div className="flex items-center gap-1 text-xs mt-3 text-blue-400 opacity-0 group-hover:opacity-100 transition">
                    Open <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Railway News */}
        <div>
          <h2 className="text-white text-sm font-semibold mb-3">Railway News & Updates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Mumbai suburban network to get 50 new rakes</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Indian Railways announces 50 new modern rakes for Mumbai suburban network to reduce overcrowding and improve frequency on major corridors.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Kavach 4.0 trial successful on Central Railway</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Latest version of indigenous anti-collision system Kavach successfully tested, covering 1,500 km of track with zero communication failures.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">1 day ago</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Vande Bharat sleeper version enters production</p>
                  <p className="text-xs text-slate-400 mt-1">
                    First set of Vande Bharat sleeper coaches rolls out of production facility, expected to debut on long-distance routes by next quarter.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">3 days ago</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">AI-based track monitoring system deployed</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Indian Railways deploys AI-powered visual inspection system across 5,000 km to detect track defects in real-time using CCTV and computer vision.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
