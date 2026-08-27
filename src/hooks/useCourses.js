import { useContext } from 'react';
import CourseContext from '../context/CourseContext';

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within CourseProvider');
  }
  return context;
}

export const useCourseContext = useCourses;
export default useCourses;
