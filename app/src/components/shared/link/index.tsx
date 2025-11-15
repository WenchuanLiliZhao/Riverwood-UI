import { Link } from "react-router";

export interface RiverwoodLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RiverwoodLink: React.FC<RiverwoodLinkProps> = ({ to, children, className, style }) => {
  return (
    <Link to={to} className={className} style={style}>
      {children}
    </Link>
  )
}

export default RiverwoodLink;