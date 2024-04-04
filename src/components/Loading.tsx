import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

function Loading({ isLoading }: { isLoading: boolean }) {
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
      bg={'rgba(0, 0, 0, 0.7)'}
      h={'100%'}
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Loading ...
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        For the first time, this may take a few seconds. Because the server is
        starting up. Thank you for your patience.
      </AlertDescription>
    </Alert>
  );
}

export { Loading };
