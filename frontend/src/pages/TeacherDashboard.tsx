import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { api, Course } from '../services/api'
import { BookOpen, Plus, LogOut, GraduationCap } from 'lucide-react'
import './Dashboard.css'

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newCourse, setNewCourse] = useState({ title: '', description: '', subject: '' })
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await api.getCourses()
      setCourses(response.data)
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.createCourse(newCourse)
      setShowModal(false)
      setNewCourse({ title: '', description: '', subject: '' })
      fetchCourses()
    } catch (error) {
      console.error('Failed to create course:', error)
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
            <h1>Teacher Dashboard</h1>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-actions"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="create-button"
          >
            <Plus size={20} />
            Create New Course
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="courses-grid"
        >
          {courses.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="empty-state"
            >
              <BookOpen size={64} />
              <h2>No courses yet</h2>
              <p>Create your first course to get started</p>
            </motion.div>
          ) : (
            courses.map((course) => (
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
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Create New Course</h2>
            <form onSubmit={handleCreateCourse}>
              <input
                type="text"
                placeholder="Course Title"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                required
                className="modal-input"
              />
              <input
                type="text"
                placeholder="Subject (e.g., Mathematics, Science)"
                value={newCourse.subject}
                onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                required
                className="modal-input"
              />
              <textarea
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                required
                className="modal-textarea"
                rows={4}
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Create Course
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

