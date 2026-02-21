"use client"
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = [
    { label: "home",        path: "/home" },
    { label: "modules",     path: "/modules" },
    { label: "piazza",      path: "/piazza" },
    { label: "zoom",        path: "/zoom" },
    { label: "assignments", path: "/assignments" },
    { label: "quizzes",     path: "/quizzes" },
    { label: "grades",      path: "/grades" },
    { label: "people",      path: "/people/table" },
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      
      {links.map((link) => (
        <Link key={link.path} href={`/courses/${cid}/${link.path}`}
            className={`list-group-item list-group-item-action border-0
            ${pathname.includes(link.path) ? "active" : "text-danger"}`}
            id={`wd-course-${link.label}-link`}
            style={{textTransform: 'capitalize'}}>
          {link.label}
        </Link>
      ))}
    </div>
);}
