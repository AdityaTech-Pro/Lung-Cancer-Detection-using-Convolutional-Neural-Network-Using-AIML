import React from "react";
import { Card } from "@shadcn/ui/card";
import { Button } from "@shadcn/ui/button";
import { Table } from "@shadcn/ui/table";
import { Upload, BarChart, HeartPulse, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
	{ name: "Home", icon: <HeartPulse size={18} /> },
	{ name: "Upload", icon: <Upload size={18} /> },
	{ name: "Results", icon: <BrainCircuit size={18} /> },
	{ name: "Analytics", icon: <BarChart size={18} /> },
	{ name: "About", icon: <HeartPulse size={18} /> },
];

const Dashboard = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
			{/* Header/Navbar */}
			<motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
				className="bg-white shadow-md rounded-b-2xl px-8 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* Logo */}
					<div className="bg-blue-100 rounded-full p-2">
						<BrainCircuit size={32} className="text-blue-500" />
					</div>
					<span className="text-2xl font-bold text-blue-700 tracking-tight">Lung Cancer Detection using CNN</span>
				</div>
				<nav className="flex gap-6">
					{navLinks.map((link) => (
						<Button variant="ghost" key={link.name} className="flex items-center gap-1 text-blue-600 font-medium">
							{link.icon}
							{link.name}
						</Button>
					))}
				</nav>
			</motion.header>

			{/* Main Grid Layout */}
			<main className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-8">
				{/* Patient Image Upload Section */}
				<Card className="rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center justify-center">
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
						<div className="flex flex-col items-center gap-2">
							<Upload size={40} className="text-blue-400 mb-2" />
							<span className="text-lg font-semibold text-blue-700">Upload CT Scan/X-ray</span>
							<Button className="mt-3 bg-blue-500 text-white rounded-full px-6 py-2">Drag & Drop or Click to Upload</Button>
						</div>
					</motion.div>
				</Card>

				{/* AI Detection Results Section */}
				<Card className="rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center justify-center">
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
						<div className="flex flex-col items-center gap-2">
							<BrainCircuit size={40} className="text-blue-400 mb-2" />
							<span className="text-lg font-semibold text-blue-700">AI Detection Results</span>
							<div className="mt-2 text-xl font-bold text-green-600">No Cancer Detected</div>
							<div className="text-sm text-gray-500">Confidence: <span className="font-bold text-green-600">92%</span></div>
							<Button className="mt-3 bg-blue-500 text-white rounded-full px-6 py-2">Download Report (PDF)</Button>
						</div>
					</motion.div>
				</Card>

				{/* Analytics & Model Performance Section */}
				<Card className="rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center justify-center">
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
						<div className="flex flex-col items-center gap-2">
							<BarChart size={40} className="text-blue-400 mb-2" />
							<span className="text-lg font-semibold text-blue-700">Analytics & Model Performance</span>
							<div className="mt-2 text-sm text-gray-500">Accuracy, Precision, Recall, F1-Score, Confusion Matrix</div>
							{/* Placeholder for charts */}
							<div className="w-full h-32 bg-blue-50 rounded-xl mt-2 flex items-center justify-center text-blue-300">[Charts]</div>
						</div>
					</motion.div>
				</Card>

				{/* Patient Report History Section */}
				<Card className="rounded-2xl shadow-lg bg-white p-6 col-span-1 md:col-span-2 xl:col-span-3">
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
						<div className="flex flex-col gap-2">
							<span className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2"><HeartPulse size={24} className="text-blue-400" /> Patient Report History</span>
							{/* Table placeholder */}
							<Table className="w-full">
								{/* Table Head */}
								<thead className="bg-blue-50">
									<tr>
										<th className="p-2 text-left">Patient ID</th>
										<th className="p-2 text-left">Scan Date</th>
										<th className="p-2 text-left">Result</th>
										<th className="p-2 text-left">Confidence</th>
									</tr>
								</thead>
								<tbody>
									<tr className="hover:bg-blue-100">
										<td className="p-2">P001</td>
										<td className="p-2">2025-08-22</td>
										<td className="p-2 text-green-600">No Cancer</td>
										<td className="p-2">92%</td>
									</tr>
									<tr className="hover:bg-blue-100">
										<td className="p-2">P002</td>
										<td className="p-2">2025-08-21</td>
										<td className="p-2 text-red-600">Cancer Detected</td>
										<td className="p-2">87%</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</motion.div>
				</Card>

				{/* Additional Insights Section */}
				<Card className="rounded-2xl shadow-lg bg-white p-6 col-span-1 md:col-span-2 xl:col-span-3">
					<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
						<div className="flex flex-col gap-2">
							<span className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2"><BrainCircuit size={24} className="text-blue-400" /> Additional Insights</span>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="bg-blue-50 rounded-xl p-4">
									<span className="font-bold text-blue-600">Risk Factors & Preventive Measures</span>
									<ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
										<li>Smoking cessation</li>
										<li>Regular screenings</li>
										<li>Healthy lifestyle</li>
									</ul>
								</div>
								<div className="bg-blue-50 rounded-xl p-4">
									<span className="font-bold text-blue-600">Why Early Detection Matters</span>
									<p className="mt-2 text-sm text-gray-700">Early detection of lung cancer significantly improves treatment outcomes and survival rates.</p>
								</div>
							</div>
						</div>
					</motion.div>
				</Card>
			</main>

			{/* Footer */}
			<footer className="bg-white rounded-t-2xl shadow-inner px-8 py-4 mt-8 flex flex-col md:flex-row items-center justify-between">
				<div className="text-sm text-gray-500">Credits: AdityaTech-Pro | <a href="https://github.com/AdityaTech-Pro/Lung-Cancer-Detection-using-Convolutional-Neural-Network-Using-AIML" className="text-blue-500 underline">GitHub</a></div>
				<div className="text-sm text-gray-500">Contact: aditya@example.com</div>
			</footer>
		</div>
	);
};

export default Dashboard;
