import { Heading, Text, styled } from "@kuma-ui/core";

const Container = styled("div")`
  margin: 0 auto;
  padding: 15px;
  max-width: 585px;
`;

const ImageContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Image = styled("img")`
  width: 100px;
  height: auto;
  border-radius: var(--1);
`;
interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

interface PhotoListComponentProps {
  text: string;
  photoList: Photo[];
}
const PhotoListComponent: React.FC<PhotoListComponentProps> = ({
  text,
  photoList,
}) => {
  return (
    <Container>
      <Heading as="h1" color="var(--hiContrast)">
        PhotoListComponent from Kuma UI.
      </Heading>
      <Text style={{ margin: 0 }}>text: {text}</Text>

      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {photoList.map((photo) => (
          <li key={photo.id}>
            <ImageContainer>
              <Image src={photo.thumbnailUrl} alt={photo.title} />
              <Text>{photo.title}</Text>
            </ImageContainer>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default PhotoListComponent;
