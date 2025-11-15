
import { useLocation } from "react-router";

export interface RiverwoodLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RiverwoodLink: React.FC<RiverwoodLinkProps> = ({ href, children, className, style }) => {
  const location = useLocation();
  
  // 规范化路径：移除末尾斜杠（除了根路径）
  const normalizePath = (path: string) => {
    if (path === "/") return "/";
    return path.endsWith("/") ? path.slice(0, -1) : path;
  };
  
  const currentPath = normalizePath(location.pathname);
  const targetPath = normalizePath(href);
  const isCurrentPage = currentPath === targetPath;
  
  return (
    <a 
      href={href} 
      className={className} 
      style={style}
      aria-current={isCurrentPage ? "page" : undefined}
    >
      {children}
    </a>
  )
}

export default RiverwoodLink;