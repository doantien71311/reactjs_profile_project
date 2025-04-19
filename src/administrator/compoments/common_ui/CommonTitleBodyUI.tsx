import { ReactNode } from "react";
import { Container, Row } from "react-bootstrap";

export type CommonTitleBodyUIProps = { title: ReactNode; body: ReactNode };
export const CommonTitleBodyUI = ({ title, body }: CommonTitleBodyUIProps) => {
  return (
    <>
      <Container fluid>
        <Row>{title}</Row>
        <Row
          style={{
            width: "1fr",
            backgroundColor: "green",
          }}
        >
          {body}
        </Row>
      </Container>
    </>
  );
};
