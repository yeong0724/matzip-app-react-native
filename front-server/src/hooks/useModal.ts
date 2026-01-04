import { useState } from 'react';

function useModal() {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return { isVisible, showModal, hideModal };
}

export default useModal;
