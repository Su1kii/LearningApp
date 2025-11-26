import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { api, Course, AIRecommendations } from '../services/api'
import { BookOpen, LogOut, GraduationCap, Sparkles, TrendingUp } from 'lucide-react'
import './Dashboard.css'

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [availableCourses, setAvailableCourses] = useState<Course[]>([])
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null)
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
    fetchRecommendations()
  }, [])

  const fetchCourses = async () => {
    try {
      const [enrolledResponse, browseResponse] = await Promise.all([
        api.getCourses(),
        api.browseCourses()
      ])
      setEnrolledCourses(enrolledResponse.data)
      
      // Filter out enrolled courses from available courses
      const enrolledIds = new Set(enrolledResponse.data.map(c => c.id))
      const available = browseResponse.data.filter(c => !enrolledIds.has(c.id))
      setAvailableCourses(available)
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async () => {
    try {
      const response = await api.getAIRecommendations()
      setRecommendations(response.data)
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <div className="header-content">
          <div className="header-left">
            <GraduationCap size={32} className="header-icon" />
            <h1>Student Dashboard</h1>
          </div>
          <div className="header-right">
            <span className="user-name">Welcome, {user?.full_name}</span>
            <button onClick={logout} className="logout-button">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      <div className="dashboard-content">
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ai-recommendations"
          >
            <div className="recommendations-header">
              <Sparkles className="sparkles-icon" />
              <h2>AI-Powered Learning Recommendations</h2>
            </div>
            <div className="recommendations-content">
              <div className="performance-badge">
                <TrendingUp size={20} />
                <span>Performance: {recommendations.performance_score.toFixed(0)}%</span>
                <span className="learning-path">Path: {recommendations.learning_path}</span>
              </div>
              <ul className="recommendations-list">
                {recommendations.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="section-title"
        >
          My Courses
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="courses-grid"
        >
          {enrolledCourses.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="empty-state"
            >
              <BookOpen size={64} />
              <h2>No enrolled courses</h2>
              <p>Browse available courses below to get started</p>
            </motion.div>
          ) : (
            enrolledCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="course-card"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="course-icon">
                  <BookOpen size={32} />
                </div>
                <h3>{course.title}</h3>
                <p className="course-subject">{course.subject}</p>
                <p className="course-description">{course.description}</p>
              </motion.div>
            ))
          )}
        </motion.div>

        {availableCourses.length > 0 && (
          <>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="section-title"
              style={{ marginTop: '60px' }}
            >
              Available Courses
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="courses-grid"
            >
              {availableCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="course-card"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <div className="course-icon">
                    <BookOpen size={32} />
                  </div>
                  <h3>{course.title}</h3>
                  <p className="course-subject">{course.subject}</p>
                  <p className="course-description">{course.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

