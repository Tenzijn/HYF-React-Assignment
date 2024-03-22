import { Box, Text } from '@chakra-ui/react';
function CopyRight() {
  return (
    <Box position={'absolute'} bottom={'30px'}>
      <Text fontSize={'sm'}>
        {' '}
        Tenzin.Tibet.Dev &copy; 2024 | HYF React Project
      </Text>
    </Box>
  );
}

export { CopyRight };
