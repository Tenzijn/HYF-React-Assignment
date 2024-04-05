import { Box, Image } from '@chakra-ui/react';

type LoginImageProps = {
  imgUrl: string;
};

function LoginImage(props: LoginImageProps) {
  return (
    <Box>
      <Image
        src={`${props.imgUrl}`}
        objectFit={'contain'}
        boxSize={'400px'}
        alt='Chat app home Image'
      />
    </Box>
  );
}

export { LoginImage };
