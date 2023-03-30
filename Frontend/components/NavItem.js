import Link from "next/link";
const NavItem = ({ text, href, active }) => {
  if (text === "Sign-Out" && active) {
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("token", "");
    // }
    if(localStorage.getItem('token') != null) localStorage.removeItem('token');
    if(localStorage.getItem('user') != null) localStorage.removeItem('user');
  }
  //   return (
  //     <Link
  //       href={href}
  //       className={`nav__link`}
  //       // onClick={ localStorage.setItem("token", "")}
  //     >
  //       {text}
  //     </Link>
  //   );
  // } else {
  return (
    <Link href={href} className={`nav__link`}>
      {text}
    </Link>
  );
  // }
};

export default NavItem;
