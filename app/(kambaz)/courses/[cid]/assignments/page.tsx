"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import AssignmentControls from "./assignmentControls";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AControlButtons from "./AControlButtons";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) dispatch(deleteAssignment(selectedId));
    setShowConfirm(false);
    setSelectedId(null);
  };

  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <FaCaretDown className="me-2 fs-5" />
            <span className="fw-bold"> ASSIGNMENTS </span>
            <AssignmentControlButtons />
          </div>
          {assignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => (
            <ListGroup key={assignment._id} className="wd-assignment-list rounded-0">
              <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdAssignment className="me-4 fs-3 text-success" />
                  <div className="flex-fill">
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="wd-assignment-link fw-bold text-decoration-none text-dark"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small">
                      <span className="text-danger"> Multiple Modules </span>
                      <span className="m-2"> | </span> 
                      <span className="fw-bold"> Not available until </span> {assignment.from}
                      <span className="m-2"> | </span> <br/>
                      <span className="fw-bold"> Due </span> {assignment.due}
                      <span className="m-2"> | </span> {assignment.points} pts
                    </div>
                  </div>
                  <FaTrash className="text-danger me-3 fs-5"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteClick(assignment._id)} />
                  <AControlButtons />
                </div>
              </ListGroupItem>
            </ListGroup>
          ))}
        </ListGroupItem>
      </ListGroup>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>No</Button>
          <Button variant="danger" onClick={handleConfirmDelete}
                  id="wd-confirm-delete-assignment">Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
