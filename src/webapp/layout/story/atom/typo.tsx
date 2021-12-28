import styled from "@emotion/styled";

interface BodyProps {
  color?: "$text-primary" | "$text-secondary";
  size?: "small";
  children: string;
  className?: string;
}

export const Body = styled.p<BodyProps>(({ size, color }) => ({
  fontWeight: 400,
  fontFamily: "'Archivo',sans-serif",
  margin: 0,
  padding: 0,
  fontSize: size == "small" ? "1.2rem" : "1rem",
  lineHeight: 1.4,
  maxWidth: "600px",
  color: color == '$text-primary' ? "#212121" : '#AFAFAF',
}))

interface DisplayProps {
  gutterBottom?: boolean; 
  children: string;
  className?: string;
}

export const Display = styled.h1<DisplayProps>(({ gutterBottom }) => ({
  fontWeight: 700,
  lineHeight: "2.875rem",
  fontFamily: "'Archivo',sans-serif",
  color: "#212121",
  margin: 0,
  padding: 0,
  fontSize: "3rem",
  marginBottom: gutterBottom ? "1.5rem" : 0,
}))
