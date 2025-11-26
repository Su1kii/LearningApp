import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { api, Course, Assignment } from '../services/api'
import { ArrowLeft, Plus, BookOpen, Calendar, FileText } from 'lucide-react'
import './CourseDetail.css'

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    due_date: '',
    max_score: 100
  })
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchCourse()
      fetchAssignments()
      if (user?.role === 'student') {
        checkEnrollmentStatus()
      }
    }
  }, [id, user])

  const fetchCourse = async () => {
    try {
      const response = await api.getCourse(Number(id))
      setCourse(response.data)
    } catch (error) {
      console.error('Failed to fetch course:', error)
    }
  }

  const checkEnrollmentStatus = async () => {
    if (!id) return
    try {
      const response = await api.getEnrollmentStatus(Number(id))
      setIsEnrolled(response.data.enrolled)
    } catch (error) {
      console.error('Failed to check enrollment status:', error)
    }
  }

  const fetchAssignments = async () => {
    try {
      const response = await api.getAssignments(Number(id))
      setAssignments(response.data)
    } catch (error) {
      console.error('Failed to fetch assignments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!id) return
    try {
      await api.enrollInCourse(Number(id))
      setIsEnrolled(true)
      // Redirect to student dashboard after successful enrollment
      navigate('/student')
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to enroll')
    }
  }

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    try {
      await api.createAssignment({
        ...newAssignment,
        course_id: Number(id),
        due_date: new Date(newAssignment.due_date).toISOString()
      })
      setShowModal(false)
      setNewAssignment({ title: '', description: '', due_date: '', max_score: 100 })
      fetchAssignments()
    } catch (error) {
      console.error('Failed to create assignment:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!course) {
    return <div className="loading">Course not found</div>
  }

  const isTeacher = user?.role === 'teacher'

  return (
    <div className="course-detail">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="course-header"
      >
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
      </motion.header>

      <div className="course-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="course-info"
        >
          <div className="course-icon-large">
            <BookOpen size={48} />
          </div>
          <h1>{course.title}</h1>
          <p className="course-subject-badge">{course.subject}</p>
          <p className="course-description-full">{course.description}</p>
          {!isTeacher && !isEnrolled && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnroll}
              className="enroll-button"
            >
              Enroll in Course
            </motion.button>
          )}
          {!isTeacher && isEnrolled && (
            <div className="enrolled-badge">
              ✓ You are enrolled in this course
            </div>
          )}
        </motion.div>

        <div className="assignments-section">
          <div className="assignments-header">
            <h2>Assignments</h2>
            {isTeacher && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="create-assignment-button"
              >
                <Plus size={20} />
                Create Assignment
              </motion.button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="assignments-list"
          >
            {assignments.length === 0 ? (
              <div className="empty-assignments">
                <FileText size={48} />
                <p>No assignments yet</p>
              </div>
            ) : (
              assignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="assignment-card"
                  onClick={() => navigate(`/assignment/${assignment.id}`)}
                >
                  <div className="assignment-icon">
                    <FileText size={24} />
                  </div>
                  <div className="assignment-content">
                    <h3>{assignment.title}</h3>
                    <p>{assignment.description}</p>
                    <div className="assignment-meta">
                      <span className="due-date">
                        <Calendar size={16} />
                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                      <span className="max-score">Max Score: {assignment.max_score}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
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
            <h2>Create New Assignment</h2>
            <form onSubmit={handleCreateAssignment}>
              <input
                type="text"
                placeholder="Assignment Title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                required
                className="modal-input"
              />
              <textarea
                placeholder="Description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                required
                className="modal-textarea"
                rows={4}
              />
              <input
                type="datetime-local"
                value={newAssignment.due_date}
                onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
                required
                className="modal-input"
              />
              <input
                type="number"
                placeholder="Max Score"
                value={newAssignment.max_score}
                onChange={(e) => setNewAssignment({ ...newAssignment, max_score: Number(e.target.value) })}
                required
                min="1"
                className="modal-input"
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Create Assignment
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

