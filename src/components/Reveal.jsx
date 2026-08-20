import { useInView } from "../hooks/useInView";

export default function Reveal({ children, delay = 0, dir = "up", className = "", as: Tag = "div", ...rest }) {
  const [ref, inView] = useInView(0.15);
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${dir} ${inView ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
