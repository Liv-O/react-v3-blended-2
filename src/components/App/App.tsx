import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import { getPhotos } from '../../services/photos';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';

export default function App() {
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedModalPhoto, setSelectedModalPhoto] = useState<Photo | null>(
    null
  );

  const handleSearch = async (userInput: string) => {
    try {
      setLoading(true);
      setIsError(false);
      const data = await getPhotos(userInput);
      setSelectedPhotos(data);
    } catch {
      setIsError(true);
      toast.error('Something happened, please try again');
      //console.log('error');
    } finally {
      setLoading(false);
    }
  };
  const openModal = (photo: Photo) => {
    setIsOpenModal(true);
    setSelectedModalPhoto(photo);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedModalPhoto(null);
  };

  return (
    <>
      <Section>
        <Container>
          {isOpenModal && (
            <Modal closeModal={closeModal}>
              <img
                src={selectedModalPhoto?.src.large}
                alt={selectedModalPhoto?.alt}
              />
            </Modal>
          )}
          <Form onSubmit={handleSearch} />
          {isError && (
            <Text>
              <Toaster />
            </Text>
          )}
          {isLoading && <Loader />}
          {selectedPhotos && (
            <PhotosGallery
              photos={selectedPhotos}
              openModal={openModal}
            />
          )}
        </Container>
      </Section>
    </>
  );
}
