"use client"
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form id="wd-assignments-editor">
        <Form.Group >
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control id="wd-name" defaultValue="A1"/>
        </Form.Group><br/>
        
        <Form.Group>
          <Form.Control id="wd-description" as="textarea" cols={45} rows={12} defaultValue={
`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include:

• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link back to the landing page.`
          }/>
        </Form.Group> <br/>
          
        <Row className="mb-3 align-items-center">
          <Form.Label column md={3} className="text-end" htmlFor="wd-points">Points</Form.Label>
          <Col md={9}>
            <Form.Control type="number" id="wd-points" defaultValue={100} />
          </Col>
        </Row>
        
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-end">
            <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>
        
        <Row className="mb-3 align-items-center">
          <Col md={3} className="text-end">
            <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </Form.Select>
          </Col>
        </Row>
      
        <Row className="mb-3">
          <Col md={3} className="text-end">
            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group className="border rounded p-3">
                <Form.Select id="wd-submission-type" defaultValue="Online">
                  <option value="Online">Online</option>
                  <option value="In Person">In Person</option>
                </Form.Select> <br/>
                <Form.Label className="fw-bold"> Online Entry Options </Form.Label>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked/>
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotations" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
            </Form.Group>
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col md={3} className="text-end">
            <Form.Label htmlFor="wd-assign-to">Assign</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group className="border rounded p-3">
              <Form.Label className="fw-bold" htmlFor="wd-assign-to"> Assign to </Form.Label>
              <Form.Select id="wd-assign-to" defaultValue="Everyone">
                <option value="Everyone">Everyone</option>
                <option value="Section 1">Section 1</option>
                <option value="Section 2">Section 2</option>
              </Form.Select> <br/>
              <Form.Label htmlFor="wd-due-date" className="fw-bold">
                Due
              </Form.Label>
              <Form.Control type="date" id="wd-due-date" defaultValue="2024-05-13" /> <br/>
              <Row>
                <Col md={6}>
                  <Form.Label htmlFor="wd-available-from" className="fw-bold">
                    Available from
                  </Form.Label>
                  <Form.Control type="date" id="wd-available-from" defaultValue="2024-05-06" />
                </Col>
                
                <Col md={6}>
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">
                    Until
                  </Form.Label>
                  <Form.Control type="date" id="wd-available-until" defaultValue="2024-05-20" />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Form> <hr />
  
      <Button variant="danger" className="float-end">Save</Button>
      <Button variant="secondary" className="me-2 float-end">Cancel</Button>
    </div>
);}
