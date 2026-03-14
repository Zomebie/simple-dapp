import styled from "styled-components";

const CardWrapper = styled.section`
  border-radius: 16px;
  background: #ffffff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.3s ease;
`;

const CardHeader = styled.div`
  background-color: #f2f2f6;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1d1d1f;
  letter-spacing: -0.02em;
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  const cardId = `card-${title.replaceAll(/\s+/g, "-").toLowerCase()}`;

  return (
    <CardWrapper aria-labelledby={cardId}>
      <CardHeader>
        <CardTitle id={cardId}>{title}</CardTitle>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </CardWrapper>
  );
}
