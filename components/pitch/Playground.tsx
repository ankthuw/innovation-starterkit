'use client';

import { useState } from 'react';
import { Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7 } from './index';

const routes = [
  { id: 'slide1', name: 'Slide 1: Title', component: Slide1 },
  { id: 'slide2', name: 'Slide 2: Market Opportunity', component: Slide2 },
  { id: 'slide3', name: 'Slide 3: Problem', component: Slide3 },
  { id: 'slide4', name: 'Slide 4: Solution', component: Slide4 },
  { id: 'slide5', name: 'Slide 5: Business Model', component: Slide5 },
  { id: 'slide6', name: 'Slide 6: Competition', component: Slide6 },
  { id: 'slide7', name: 'Slide 7: Team & Ask', component: Slide7 },
];

export const PitchPlayground = () => {
  const [selectedRoute, setSelectedRoute] = useState('slide1');
  const CurrentSlide = routes.find(r => r.id === selectedRoute)?.component || Slide1;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-800">Pitch Slides</h1>
          <p className="text-xs text-gray-500 mt-1">Click to preview</p>
        </div>
        <nav className="p-2">
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route.id)}
              className={`w-full text-left px-3 py-2 rounded-md mb-1 transition-colors ${
                selectedRoute === route.id
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {route.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CurrentSlide />
        </div>
      </div>
    </div>
  );
};
