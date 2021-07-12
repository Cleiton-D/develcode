import React, { useEffect, useState } from 'react';
import * as S from './styles';

type ImagePickerProps = {
  imageUrl?: string;
  name: string;
};

const ImagePicker = ({ imageUrl, name }: ImagePickerProps) => {
  const [image, setImage] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (result) => {
        setImage(result.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  return (
    <S.Wrapper imageUrl={image || '/img/user.png'}>
      <input type="file" name={name} onChange={handleChange} />
    </S.Wrapper>
  );
};

export default ImagePicker;
