import React from 'react';
import {
  TimeDisplay,
  Timetable,
  Calendar,
  Notes,
  Timer,
  TaskSummary,
  AppLayout,
  FloatingControls
} from './components';
import { TaskProvider, ThemeProvider } from './contexts';
import { useUnsplashBackground } from './hooks';

export default function App() {
  useUnsplashBackground();

  return (
    <ThemeProvider>
      <TaskProvider>
        <AppLayout>
          <FloatingControls />
          <TimeDisplay />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="md:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
              <Timetable />
              <Notes />
            </div>
            <div className="md:col-span-2 lg:col-span-6">
              <Calendar />
            </div>
            <div className="md:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
              <TaskSummary />
              <Timer />
            </div>
          </div>
        </AppLayout>
      </TaskProvider>
    </ThemeProvider>
  );
}