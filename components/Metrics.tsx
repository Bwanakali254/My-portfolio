'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Code, Book, Briefcase, Clock } from 'lucide-react';

// Import types first
import type { ChartData, ChartOptions } from 'chart.js';

// Dynamic import for the chart components
const DynamicBar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const DynamicLine = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const DynamicDoughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

// Register chart components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

if (typeof window !== 'undefined') {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
}

const metricsData = {
  totalSkills: 13,
  totalProjects: 2,
  totalArticles: 1,
  avgExperience: 2.3,
  skillsByCategory: {
    labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'AI Tools'],
    data: [4, 3, 1, 1, 2]
  },
  proficiencyDistribution: {
    labels: ['Advanced', 'Intermediate'],
    data: [8, 5]
  },
  mostUsedTech: {
    labels: ['React', 'Next.js', 'TypeScript', 'Firebase'],
    data: [1, 0.9, 0.8, 0.7]
  }
};

// Create separate options for each chart type
const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 12,
        padding: 10
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        maxTicksLimit: 5
      }
    }
  }
};

const doughnutChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 12,
        padding: 10
      }
    }
  }
};

export function Metrics() {
  const skillsByCategoryData: ChartData<'bar'> = {
    labels: metricsData.skillsByCategory.labels,
    datasets: [
      {
        label: 'Number of Skills',
        data: metricsData.skillsByCategory.data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const proficiencyData: ChartData<'doughnut'> = {
    labels: metricsData.proficiencyDistribution.labels,
    datasets: [
      {
        data: metricsData.proficiencyDistribution.data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const techUsageData: ChartData<'bar'> = {
    labels: metricsData.mostUsedTech.labels,
    datasets: [
      {
        label: 'Usage Frequency',
        data: metricsData.mostUsedTech.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Professional Growth Metrics</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A comprehensive overview of my technical expertise and growth
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ y: -3 }}
        >
          <Code className="w-6 h-6 mb-2 text-blue-500" />
          <h3 className="text-2xl font-bold">{metricsData.totalSkills}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Skills</p>
        </motion.div>

        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ y: -3 }}
        >
          <Briefcase className="w-6 h-6 mb-2 text-pink-500" />
          <h3 className="text-2xl font-bold">{metricsData.totalProjects}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
        </motion.div>

        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ y: -3 }}
        >
          <Book className="w-6 h-6 mb-2 text-purple-500" />
          <h3 className="text-2xl font-bold">{metricsData.totalArticles}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Articles</p>
        </motion.div>

        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          whileHover={{ y: -3 }}
        >
          <Clock className="w-6 h-6 mb-2 text-green-500" />
          <h3 className="text-2xl font-bold">{metricsData.avgExperience}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Experience</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[300px]"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold mb-3">Skills by Category</h3>
          <div className="h-[250px]">
            <DynamicBar 
              data={skillsByCategoryData} 
              options={{
                ...barChartOptions,
                aspectRatio: undefined,
                maintainAspectRatio: false
              }} 
            />
          </div>
        </motion.div>

        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[300px]"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold mb-3">Proficiency Distribution</h3>
          <div className="h-[250px]">
            <DynamicDoughnut 
              data={proficiencyData}
              options={doughnutChartOptions}
            />
          </div>
        </motion.div>

        <motion.div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg md:col-span-2 h-[300px]"
          whileHover={{ y: -3 }}
        >
          <h3 className="text-lg font-semibold mb-3">Most Used Technologies</h3>
          <div className="h-[250px]">
            <DynamicBar 
              data={techUsageData} 
              options={{
                ...barChartOptions,
                aspectRatio: undefined,
                maintainAspectRatio: false
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 