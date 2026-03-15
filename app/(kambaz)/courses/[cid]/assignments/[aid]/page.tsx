"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";

type Assignment = {
  _id: string;
  title: string;
  desc?: string;
  from: string;
  due: string;
  until?: string;
  points: number;
  course: string;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter(); // programmatic navigation
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const existing = aid === "new" // Checking if making new or its an existing one
    ? null
    : (assignments).find((a) => a._id === aid);

  const [assignment, setAssignment] = useState<Assignment>(
    existing ?? {
      _id: "0",
      title: "New Assignment",
      desc: "",
      from: "",
      due: "",
      until: "",
      points: 100,
      course: cid as string,
    }
  );

  const handleSave = () => {
    if (aid === "new") {
      dispatch(addAssignment({ ...assignment, course: cid as string }));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form id="wd-assignments-editor">
        <Form.Group >
          <Form.Label htmlFor="wd-name">Assignment Title</Form.Label>
          <Form.Control id="wd-name" value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
        </Form.Group><br />

        <Form.Group>
          <Form.Control id="wd-description" as="textarea" cols={45} rows={12}
            value={assignment.desc}
            onChange={(e) => setAssignment({ ...assignment, desc: e.target.value })} />
        </Form.Group><br />

        <Row className="mb-3 align-items-center">
          <Form.Label column md={3} className="text-end" htmlFor="wd-points">Points</Form.Label>
          <Col md={9}>
            <Form.Control type="number" id="wd-points" value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} />
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
              </Form.Select><br />
              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
              <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
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
              </Form.Select> <br />
              <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
              <Form.Control type="date" id="wd-due-date" value={assignment.due}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} /><br />
              <Row>
                <Col md={6}>
                  <Form.Label htmlFor="wd-available-from" className="fw-bold">Available from</Form.Label>
                  <Form.Control type="date" id="wd-available-from" value={assignment.from}
                    onChange={(e) => setAssignment({ ...assignment, from: e.target.value })} />
                </Col>
                <Col md={6}>
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">Until</Form.Label>
                  <Form.Control type="date" id="wd-available-until" value={assignment.until ?? ""}
                    onChange={(e) => setAssignment({ ...assignment, until: e.target.value })} />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Form><hr />

      <Button variant="danger" className="float-end" id="wd-save-assignment"
              onClick={handleSave}>Save</Button>
      <Button variant="secondary" className="me-2 float-end" id="wd-cancel-assignment"
              onClick={handleCancel}>Cancel</Button>
    </div>
  );
}
