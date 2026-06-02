"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

export default function CalculatorPage() {
  const [servers, setServers] = useState(1);
  const [storage, setStorage] = useState(500);

  // Simple placeholder calculation logic
  const estimatedCost = (servers * 2500) + (storage * 5);

  return (
    <div className="bg-brand-gray min-h-screen py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Calculator className="h-12 w-12 text-brand-red mx-auto mb-4" />
          <h1 className="text-4xl font-heading font-bold text-brand-black mb-4">Infrastructure Price Estimator</h1>
          <p className="text-gray-600">
            Use this simple tool to get a rough estimate of your potential monthly infrastructure costs. For an accurate quote, please request a full assessment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-bold text-brand-black">Number of Servers / Compute Nodes</label>
                <span className="text-brand-red font-bold">{servers}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={servers}
                onChange={(e) => setServers(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-bold text-brand-black">Storage Requirement (GB)</label>
                <span className="text-brand-red font-bold">{storage} GB</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={storage}
                onChange={(e) => setStorage(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
            </div>

            <div className="mt-8 p-6 bg-brand-black text-white rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Estimated Monthly Cost</p>
              <h2 className="text-4xl font-heading font-bold text-white">₹ {estimatedCost.toLocaleString()} <span className="text-lg font-normal text-gray-400">/ month</span></h2>
              <p className="text-xs text-gray-500 mt-4">*This is an indicative estimate only and does not constitute a commercial offer.</p>
            </div>
            
            <div className="text-center pt-4">
              <Link href="/assessment" className="text-brand-red font-bold hover:underline">
                Get a Detailed Custom Quote →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
