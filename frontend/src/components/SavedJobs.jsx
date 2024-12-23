import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement API call to fetch saved jobs
    // This is a placeholder for demonstration
    setLoading(false);
  }, []);

  const handleRemoveJob = (jobId) => {
    // TODO: Implement remove job functionality
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <div className="text-center">
          <p>You haven't saved any jobs yet.</p>
          <Link to="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <Row>
          {savedJobs.map((job) => (
            <Col md={6} lg={4} key={job.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company}
                  </Card.Subtitle>
                  <Card.Text>
                    {job.location}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link 
                      to={`/description/${job.id}`} 
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveJob(job.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SavedJobs;
