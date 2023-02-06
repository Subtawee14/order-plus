import { useState, createContext, useContext } from 'react';

interface IModalContext {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const modalContext = createContext<IModalContext>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(modalContext);

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <modalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};
