import Link from "next/link";
const NavItem = ({ text, href, active }) => {
  if (text === "Sign-Out") {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", "");
    }
    return (
      <Link href={href} className={`nav__link`}>
        {text}
      </Link>
    );
  } else {
    return (
      <Link href={href} className={`nav__link`}>
        {text}
      </Link>
    );
  }
};

export default NavItem;
