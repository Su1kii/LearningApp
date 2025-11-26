import axios from "axios";

// Ensure proper API URL format (must end with /api, no trailing slash)
const getApiUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  let url = envUrl || "http://localhost:8000/api";

  // Remove ALL trailing slashes
  url = url.replace(/\/+$/, "");

  // If URL doesn't end with /api, add it
  if (!url.endsWith("/api")) {
    // If it's just the base URL, add /api
    if (url.includes("onrender.com") || url.includes("localhost:8000")) {
      url = url + "/api";
    }
  }

  return url;
};

const API_URL = getApiUrl();

export interface Course {
  id: number;
  title: string;
  description: string;
  subject: string;
  teacher_id: number;
  created_at: string;
}

export interface Assignment {
  id: number;
  course_id: number;
  title: string;
  description: string;
  due_date: string;
  max_score: number;
  created_at: string;
}

export interface Submission {
  id: number;
  assignment_id: number;
  student_id: number;
  content: string;
  submitted_at: string;
  grade: number | null;
}

export interface AIRecommendations {
  recommendations: string[];
  learning_path: string;
  performance_score: number;
}

export const api = {
  getCourses: () => axios.get<Course[]>(`${API_URL}/courses`),
  browseCourses: () => axios.get<Course[]>(`${API_URL}/courses/browse`),
  getCourse: (id: number) => axios.get<Course>(`${API_URL}/courses/${id}`),
  getEnrollmentStatus: (courseId: number) =>
    axios.get<{ enrolled: boolean }>(
      `${API_URL}/courses/${courseId}/enrollment-status`
    ),
  createCourse: (data: {
    title: string;
    description: string;
    subject: string;
  }) => axios.post<Course>(`${API_URL}/courses`, data),
  enrollInCourse: (courseId: number) =>
    axios.post(`${API_URL}/courses/${courseId}/enroll`),
  getAssignment: (id: number) =>
    axios.get<Assignment>(`${API_URL}/assignments/${id}`),
  getAssignments: (courseId: number) =>
    axios.get<Assignment[]>(`${API_URL}/assignments/course/${courseId}`),
  createAssignment: (data: {
    course_id: number;
    title: string;
    description: string;
    due_date: string;
    max_score: number;
  }) => axios.post<Assignment>(`${API_URL}/assignments`, data),
  getSubmissions: (assignmentId: number) =>
    axios.get<Submission[]>(
      `${API_URL}/submissions/assignment/${assignmentId}`
    ),
  createSubmission: (data: { assignment_id: number; content: string }) =>
    axios.post<Submission>(`${API_URL}/submissions`, data),
  getAIRecommendations: () =>
    axios.get<AIRecommendations>(`${API_URL}/ai/recommendations`),
};
