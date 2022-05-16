import styled from "@emotion/styled";

interface BodyProps {
  color?: "$text-primary" | "$text-secondary";
  size?: "small";
  children: string;
  className?: string;
}

export const Body = styled.p<BodyProps>(({ size, color }) => ({
  fontWeight: 400,
  fontFamily: "'DM Sans',sans-serif",
  margin: 0,
  padding: 0,
  fontSize: size == "small" ? "0.875rem" : "1rem",
  lineHeight: size == "small" ? "1.25rem" : "1.375rem",
  maxWidth: "600px",
  color: color == "$text-primary" ? "#212121" : "#6A6A6A",
}));

interface DisplayProps {
  gutterBottom?: boolean;
  children: string;
  className?: string;
}

export const Display = styled.h1<DisplayProps>(({ gutterBottom }) => ({
  fontWeight: 700,
  lineHeight: "2.875rem",
  fontFamily: "'Kivra Sans', sans-serif",
  color: "#212121",
  margin: 0,
  padding: 0,
  fontSize: "3rem",
  marginBottom: gutterBottom ? "1.5rem" : 0,
}));
