import { Box, Text, Show } from '@chakra-ui/react';
function CopyRight() {
  return (
    <Show above='lg'>
      <Box>
        <Text fontSize={'sm'}>
          {' '}
          Tenzin.Tibet.Dev &copy; 2024 | HYF React Project
        </Text>
      </Box>
    </Show>
  );
}

export { CopyRight };
