import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

type LoadingProps = {
  isLoading: boolean;
  title: string;
  description: string;
};

function Loading({ isLoading, title, description }: LoadingProps) {
  return (
    <Alert
      display={isLoading ? 'flex' : 'none'}
      variant='spinner'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      transform={'translate(-50%, -50%)'}
      zIndex={'100'}
      bg={'rgba(0, 0, 0, 0.9)'}
      h={'100%'}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        {title}
      </AlertTitle>
      <AlertDescription maxWidth='sm'>{description}</AlertDescription>
    </Alert>
  );
}

export { Loading };
