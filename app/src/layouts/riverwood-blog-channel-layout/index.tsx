
import { BlogNav, type BlogNavProps } from "../../components";
import type { SharedLayoutProps } from "../sharedProps";

interface RiverwoodBlogChannelLayoutProps extends SharedLayoutProps {
  blogNav: BlogNavProps;
}

const RiverwoodBlogChannelLayout: React.FC<RiverwoodBlogChannelLayoutProps> = ({
  blogNav,
  children,
}) => {
  return (
    <div>
      <BlogNav {...blogNav} />

      <section>
        {children}
      </section>
    </div>
  );
};

export default RiverwoodBlogChannelLayout;
