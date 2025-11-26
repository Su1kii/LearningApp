import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { api, Assignment, Submission } from '../services/api'
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock } from 'lucide-react'
import './AssignmentDetail.css'

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>()
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [submissionContent, setSubmissionContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchAssignment()
      fetchSubmissions()
    }
  }, [id])

  const fetchAssignment = async () => {
    if (!id) return
    try {
      const response = await api.getAssignment(Number(id))
      setAssignment(response.data)
    } catch (error) {
      console.error('Failed to fetch assignment:', error)
    }
  }

  const fetchSubmissions = async () => {
    if (!id) return
    try {
      const response = await api.getSubmissions(Number(id))
      setSubmissions(response.data)
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setSubmitting(true)
    try {
      await api.createSubmission({
        assignment_id: Number(id),
        content: submissionContent
      })
      setSubmissionContent('')
      fetchSubmissions()
      alert('Assignment submitted successfully! AI grading is in progress.')
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to submit assignment')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!assignment) {
    return <div className="loading">Assignment not found</div>
  }

  const isTeacher = user?.role === 'teacher'
  const userSubmission = submissions.find(s => s.student_id === user?.id)
  const isPastDue = new Date(assignment.due_date) < new Date()

  return (
    <div className="assignment-detail">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="assignment-header"
      >
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
      </motion.header>

      <div className="assignment-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="assignment-info"
        >
          <div className="assignment-icon-large">
            <FileText size={48} />
          </div>
          <h1>{assignment.title}</h1>
          <div className="assignment-meta-info">
            <span className={`due-date-badge ${isPastDue ? 'past-due' : ''}`}>
              <Calendar size={18} />
              Due: {new Date(assignment.due_date).toLocaleString()}
            </span>
            <span className="max-score-badge">
              Max Score: {assignment.max_score} points
            </span>
          </div>
          <div className="assignment-description">
            <h3>Description</h3>
            <p>{assignment.description}</p>
          </div>
        </motion.div>

        {!isTeacher && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="submission-section"
          >
            <h2>Submit Assignment</h2>
            {userSubmission ? (
              <div className="submission-status">
                <CheckCircle className="check-icon" />
                <div>
                  <h3>Submitted</h3>
                  <p>Submitted on: {new Date(userSubmission.submitted_at).toLocaleString()}</p>
                  {userSubmission.grade !== null && (
                    <div className="grade-display">
                      <span className="grade-label">Grade:</span>
                      <span className="grade-value">{userSubmission.grade.toFixed(1)} / {assignment.max_score}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="submission-form">
                <textarea
                  placeholder="Enter your submission here..."
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  required
                  className="submission-textarea"
                  rows={10}
                />
                <motion.button
                  type="submit"
                  disabled={submitting || isPastDue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="submit-button"
                >
                  {submitting ? 'Submitting...' : 'Submit Assignment'}
                </motion.button>
                {isPastDue && (
                  <p className="past-due-warning">
                    <Clock size={16} />
                    This assignment is past due
                  </p>
                )}
              </form>
            )}
          </motion.div>
        )}

        {isTeacher && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="submissions-list-section"
          >
            <h2>Student Submissions</h2>
            {submissions.length === 0 ? (
              <div className="empty-submissions">
                <p>No submissions yet</p>
              </div>
            ) : (
              <div className="submissions-list">
                {submissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="submission-card"
                  >
                    <div className="submission-header">
                      <h3>Submission #{submission.id}</h3>
                      <span className="submission-date">
                        {new Date(submission.submitted_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="submission-content">
                      <p>{submission.content}</p>
                    </div>
                    {submission.grade !== null && (
                      <div className="submission-grade">
                        <span className="grade-label">AI-Graded Score:</span>
                        <span className="grade-value">
                          {submission.grade.toFixed(1)} / {assignment.max_score}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

