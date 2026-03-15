"use client";
import { ReactNode, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course) => course._id === cid);
  const [showNav, setShowNav] = useState(true);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1"
                        onClick={() => setShowNav(!showNav)}
                        style={{ cursor: "pointer" }} />
        <Breadcrumb course={course} />
      </h2> <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation /> 
          </div>
        )}
        <div className="flex-fill">
          {children}
        </div>
      </div>
   </div>
);}
