import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControls from "./assignmentControls";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AControlButtons from "./AControlButtons";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />
        
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> <FaCaretDown className="me-2 fs-5" /> <span className="fw-bold"> ASSIGNMENTS </span> <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-4 fs-3 text-success" />
                <div className="flex-fill">
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  >
                    A1
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger"> Multiple Modules </span>
                    <span className="m-2"> | </span> 
                    <span className="fw-bold"> Not available until </span> May 6 at 12:00am 
                    <span className="m-2"> | </span> <br/>
                    <span className="fw-bold"> Due </span> May 13 at 11:59pm 
                    <span className="m-2"> | </span> 100 pts
                  </div>
                </div>
                <AControlButtons />  
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-4 fs-3 text-success" />
                <div className="flex-fill">
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  >
                    A2
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger"> Multiple Modules </span>
                    <span className="m-2"> | </span> 
                    <span className="fw-bold"> Not available until </span> May 13 at 12:00am 
                    <span className="m-2"> | </span> <br/>
                    <span className="fw-bold"> Due </span> May 20 at 11:59pm 
                    <span className="m-2"> | </span> 100 pts
                  </div>
                </div>
                <AControlButtons />  
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-4 fs-3 text-success" />
                <div className="flex-fill">
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  >
                    A3
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger"> Multiple Modules </span>
                    <span className="m-2"> | </span> 
                    <span className="fw-bold"> Not available until </span> May 20 at 12:00am 
                    <span className="m-2"> | </span> <br/>
                    <span className="fw-bold"> Due </span> May 27 at 11:59pm 
                    <span className="m-2"> | </span> 100 pts
                  </div>
                </div>
                <AControlButtons />  
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
