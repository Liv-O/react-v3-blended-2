import type { Photo } from '../../types/photo';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

interface PhotosGalleryProps {
  photos: Photo[];
  openModal: (photo: Photo) => void;
}

export default function PhotosGallery({
  photos,
  openModal,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((photo) => (
        <GridItem
          key={photo.id}
          onClick={() => openModal(photo)}>
          <PhotosGalleryItem photo={photo} />
        </GridItem>
      ))}
    </Grid>
  );
}
