"use client"
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControls from "./assignmentControls";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AControlButtons from "./AControlButtons";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";

type Assignment = {
  _id: string;
  title: string;
  from: string;
  due: string;
  points: number;
  course: string;
};

export default function Assignments() {
  const { cid } = useParams();
  const assignments: Assignment[] = db.assignments;
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />
        
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> <FaCaretDown className="me-2 fs-5" /> <span className="fw-bold"> ASSIGNMENTS </span> <AssignmentControlButtons />
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
                  <AControlButtons />  
                </div>
              </ListGroupItem>
            </ListGroup>
          ))}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
