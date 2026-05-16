import { Link } from "react-router-dom";

type ButtonLinkProps = {
  to: string;
  children: string;
  variant?: "secondary" | "outline-secondary";
};

export default function ButtonLink({ to, children, variant = "secondary" }: ButtonLinkProps) {
  return (
    <Link to={to} className={`btn btn-${variant}`}>
      {children}
    </Link>
  );
}
