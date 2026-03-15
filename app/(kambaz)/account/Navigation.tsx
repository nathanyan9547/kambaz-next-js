"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();
  return (
    <div id="wd-account-navigation">
      <Nav variant="pills">
        {links.map((link) => (
          <NavItem key={link} className="wd list-group fs-5 rounded-0">
            <NavLink
              as={Link}
              href={link}
              active={pathname.endsWith(link)}
              className={`list-group-item border-0  ${
                pathname.endsWith(link) ? "active" : "text-danger"
              }`}
              style={{ textTransform: 'capitalize'
            }}>
              {link} </NavLink> </NavItem>
        ))}
      </Nav>
    </div>
  );
}
