import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function AssignmentControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="float-end" id="wd-add-assignment">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button size="lg" variant="secondary" className="me-2 float-end" id="wd-add-assignment-group">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <InputGroup size="lg" className="me-2 float-start w-50" id="wd-search-assignment">
        <InputGroupText>
          <CiSearch />
        </InputGroupText>
        <FormControl placeholder="Search..." />
      </InputGroup>
   </div>
);}
