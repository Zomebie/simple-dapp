import styled from "styled-components";

const CardWrapper = styled.section`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const CardHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceSecondary};
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.cardTitle};
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <CardWrapper aria-labelledby={`card-${title.replaceAll(/\s+/g, "-").toLowerCase()}`}>
      <CardHeader>
        <CardTitle id={`card-${title.replaceAll(/\s+/g, "-").toLowerCase()}`}>{title}</CardTitle>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </CardWrapper>
  );
}
